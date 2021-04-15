function TRANSFER_PASSENGERS() {

    var spreadsheet = SpreadsheetApp.getActive();
    var sheet = spreadsheet.getActiveSheet();
    var currentTripSheetName = sheet.getName();
    var sheetCheck = SpreadsheetApp.getActive().getSheetByName("CHECKLIST");


    const autoLinkRange = "U2:W12";
    const autoNameRange = "Q2";
    const driverNameRange = "R2";

    var beginPassStartRow = 2;
    var beginPassStartColumn = "A";

    var autoLinkMap = getAutoLinkMap(sheetCheck, autoLinkRange);

    var citiesArr = getRemoteCities(sheet);

    var autoName = sheet.getRange(autoNameRange).getValue();

    var spreadsheetUrlToTransfer = autoLinkMap.get(autoName);

    var driverName = sheet.getRange(driverNameRange).getValue();

    var spreadsheetForTransfer = SpreadsheetApp.openByUrl(spreadsheetUrlToTransfer);

    var sheetToFill = spreadsheetForTransfer.getSheetByName(currentTripSheetName);

    if (sheetToFill == undefined) {
        sheetToFill = spreadsheetForTransfer.getSheetByName("SAMPLE_T").copyTo(spreadsheetForTransfer);

        sheetToFill.setName(currentTripSheetName);
    }

    var tripPassengers = getValidPassengers(sheet);

    generatePassengersIdsIfNotExist(sheet, tripPassengers);

    var passIOP = getPassengersFromPassList(sheetToFill);

    if (passIOP.length > 0) {
        var passMap = getIdPassengerMap(passIOP);
        for (var psSh in tripPassengers) {
            var currPass = tripPassengers[psSh];
            if (passMap.has(currPass.getId())) {
                currPass.setPresence(passMap.get(currPass.getId()).getPresence());
            }
        }
    }

    tripPassengers.sort(function (a, b) {
        if (a.getDeparturePoint() < b.getDeparturePoint()) {
            return -1;
        }
        if (a.getDeparturePoint() > b.getDeparturePoint()) {
            return 1;
        }
        return 0;
    })

    var passObjectList = [];

    for (var passToShow in tripPassengers) {
        passObjectList.push(passengerToParamList(tripPassengers[passToShow]));
    }
    var rangeToSeTPassArr = "A2:K" + (passObjectList.length + 1);

    var rangeToClear = "A" + (passObjectList.length + 2) + ":K300";

    sheetToFill.getRange(rangeToSeTPassArr).setValues(passObjectList);

    sheetToFill.getRange(rangeToClear).clearContent();
}

function passengerToParamList(pass) {
    var priceVar = pass.getPrice();
    if (pass.getPaymentOption() == "БЕЗНАЛ") priceVar = "";
    var objList = [pass.getPlaceNumber(), pass.getPresence(), (pass.getDeparturePoint() === 'Одесса(Лузановка)') ? 'Новофёдоровка' : pass.getDeparturePoint(), pass.getPlaceOfArrival(), pass.getFullName(), pass.getPhoneNumber(), pass.getPaymentOption(), priceVar, pass.getComment(), pass.getTicketId(), pass.getId()];
    return objList;
}

function getPassengersFromPassList(passList) {

    var passObjs = passList.getRange("A2:K300").getValues().filter(x => x[10].replace(/\s+/g, '') != "");

    var passArr = [];

    for (var passx in passObjs) {
        var currRow = passObjs[passx];
        var passengerToAdd = new Passenger();
        passengerToAdd.setPlaceNumber(currRow[0]);
        passengerToAdd.setPresence(currRow[1]);
        passengerToAdd.setDeparturePoint(currRow[2]);
        passengerToAdd.setPlaceOfArrival(currRow[3]);
        passengerToAdd.setFullName(currRow[4]);
        passengerToAdd.setPhoneNumber(currRow[5]);
        passengerToAdd.setPaymentOption(currRow[6]);
        passengerToAdd.setPrice(currRow[7]);
        passengerToAdd.setComment(currRow[8]);
        passengerToAdd.setTicketId(currRow[9]);
        passengerToAdd.setId(currRow[10]);
        passArr.push(passengerToAdd);
    }
    return passArr;
}


function getAutoLinkMap(checkList, autoLinkRange) {

    var rangeValues = checkList.getRange(autoLinkRange).getValues();

    var autoLinkMap = new Map();

    for (var item in rangeValues) {
        var row = rangeValues[item];
        if (rangeValues[item][0] != "") {
            autoLinkMap.set(rangeValues[item][0], rangeValues[item][2]);
        }
    }

    return autoLinkMap;

}