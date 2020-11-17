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

    var sheetToFill = spreadsheetForTransfer.getSheetByName("SAMPLE_T").copyTo(spreadsheetForTransfer);

    sheetToFill.setName(currentTripSheetName);

    var tripPassengers = getValidPassengers(sheet);

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
    var rangeToSeTPassArr = "A2:J" + (passObjectList.length + 1);

    sheetToFill.getRange(rangeToSeTPassArr).setValues(passObjectList);


    function passengerToParamList(pass) {
        var priceVar = pass.getPrice();
        if(pass.getPaymentOption() == "БЕЗНАЛ") priceVar = "";
        var objList = [pass.getPlaceNumber(), "false", pass.getDeparturePoint(), pass.getPlaceOfArrival(), pass.getFullName(), pass.getPhoneNumber(), pass.getPaymentOption(), priceVar, pass.getComment(), pass.getTicketId()];
        return objList;
    }

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