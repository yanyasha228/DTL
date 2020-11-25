function getPassenger(sheet, columnIndexOfActiveRange, rowIndexOfActiveRange) {

    var arrowColumnIndex = arrLit[columnIndexOfActiveRange - 1];
    var columnIndex = arrLit[columnIndexOfActiveRange - 2];
    var activeRangeName = arrLit[columnIndexOfActiveRange - 1] + rowIndexOfActiveRange;
    var specialColumnIndexForPlaceOfArrival = arrLit[columnIndexOfActiveRange];

    passenger = new Passenger();

    var strPassA1Notation = (columnIndex + (rowIndexOfActiveRange - 1)) + ":" + (specialColumnIndexForPlaceOfArrival + (rowIndexOfActiveRange + 10));

    passenger.setDeparturePointLink(columnIndex + rowIndexOfActiveRange);

//    arrivalPoint Setting with bias colum index 2

    passenger.setPlaceOfArrivalLink(specialColumnIndexForPlaceOfArrival + rowIndexOfActiveRange);
    //
    var transferTripNameStartA1 = arrLit[columnIndexOfActiveRange - 2] + (rowIndexOfActiveRange - 1);
    var transferTripNameEndA1 = arrLit[columnIndexOfActiveRange] + (rowIndexOfActiveRange - 1);
    passenger.setTransferTripNameEndLink(transferTripNameEndA1);
    passenger.setTransferTripNameStartLink(transferTripNameStartA1);
    passenger.setSelectedFlagLink(arrowColumnIndex + (rowIndexOfActiveRange - 1));
    passenger.setPhoneNumberLink(columnIndex + (rowIndexOfActiveRange + 1));
    passenger.setPaymentOptionLink(columnIndex + (rowIndexOfActiveRange + 2));
    passenger.setFullNameLink(columnIndex + (rowIndexOfActiveRange + 3));
    passenger.setPriceLink(columnIndex + (rowIndexOfActiveRange + 4));
    passenger.setTicketIdLink(columnIndex + (rowIndexOfActiveRange + 5));
    passenger.setCommentLink(columnIndex + (rowIndexOfActiveRange + 6));
    passenger.setManagerIdLink(columnIndex + (rowIndexOfActiveRange + 7));
    passenger.setSourceIdLink(columnIndex + (rowIndexOfActiveRange + 8));
    passenger.setPromoIdLink(columnIndex + (rowIndexOfActiveRange + 9));
    passenger.setIdLink(columnIndex + (rowIndexOfActiveRange + 10));
    passenger.setPassengerA1Notation(strPassA1Notation);


    function fillPassenger() {

        var passArr = sheet.getRange(strPassA1Notation).getValues();
        passenger.setPlaceNumber(getPassengerPlaceNumberByActRangeRowIndex(rowIndexOfActiveRange));
        passenger.setTransferTripNameStart(passArr[0][0]);
        passenger.setTransferTripNameEnd(passArr[0][2]);
        passenger.setSelectedFlag(passArr[0][1]);
        passenger.setDeparturePoint(passArr[1][0]);
        passenger.setPlaceOfArrival(passArr[1][2]);
        passenger.setPhoneNumber(passArr[2][0]);
        passenger.setPaymentOption(passArr[3][0]);
        passenger.setFullName(passArr[4][0]);
        passenger.setPrice(passArr[5][0]);
        passenger.setTicketId(passArr[6][0]);
        passenger.setComment(passArr[7][0]);
        passenger.setManagerId(passArr[8][0]);
        passenger.setSourceId(passArr[9][0]);
        passenger.setPromoId(passArr[10][0]);
        passenger.setId(passArr[11][0]);
    }

    fillPassenger();
    return passenger;

}

function deletePassengers(sheet, passengers) {
    for (pas in passengers) {
        cleanPassenger(sheet, passengers[pas]);
    }
}

function getSelectedPassengers(sheet) {
    return getPassengers(sheet).filter(ps => ps.getSelectedFlag());
}

function removeAllSelections(sheet) {
    var passForClear = getPassengers(sheet).filter(ps => ps.getSelectedFlag());
    for (ps in passForClear) {
        sheet.getRange(passForClear[ps].getSelectedFlagLink()).setValue(false);
    }
}

function getValidPassenger(sheet, columnIndexOfActiveRange, rowIndexOfActiveRange) {
    var ps = getPassenger(sheet, columnIndexOfActiveRange, rowIndexOfActiveRange);
    if (ps.getPhoneNumber() != "") return ps;
}

function getValidPassengers(sheet) {
    return getPassengers(sheet).filter(ps => ps.getPhoneNumber() != "");
}

function findPassengerArrowRangeByPassengerPaymentOptionRange(sheet, paymentOptionRange) {
    var placeRangeColumnLitIndex = paymentOptionRange.getColumnIndex() - 1;
    var placeRangeRowIndex = paymentOptionRange.getRowIndex();

    var columnA1NotationArrowRange = arrLit[placeRangeColumnLitIndex + 1];

    return sheet.getRange(columnA1NotationArrowRange + (placeRangeRowIndex - 2));
}

function findPassengerArrowRangeByPassengerPlaceRange(sheet, placeRange) {
    var placeRangeColumnLitIndex = placeRange.getColumnIndex() - 1;
    var placeRangeRowIndex = placeRange.getRowIndex();

    var columnA1NotationBefore = arrLit[placeRangeColumnLitIndex - 1];
    var columnA1NotationAfter = arrLit[placeRangeColumnLitIndex + 1];

    var tRangeBefore = sheet.getRange(columnA1NotationBefore + placeRangeRowIndex);
    var tRangeAfter = sheet.getRange(columnA1NotationAfter + placeRangeRowIndex);

    var tValBefore = tRangeBefore.getValue();
    var tValAfter = tRangeAfter.getValue();

    if (tValBefore == ">") {
        return tRangeBefore;
    }

    if (tValAfter == ">") {
        return tRangeAfter;
    }


}

function getPassengersArrowRangeA1Notations() {
    return passengersArrowRangeA1NotationsString.split(",");
}

function generatePassengerRangesA1Notations() {
    var startRowIndex = 4;
    var endRowIndex = 14;
    var distanceBetweenIdentRows = 13;

    var possiblePlacesAmount = 80;

    var passengersColumnRanges = ["D:F", "H:J", "L:N"];

    var passengerRangesA1Notations = [];

    for (var i = 0; i <= possiblePlacesAmount - 1; i++) {
        for (var c = 0; c <= passengersColumnRanges.length - 1; c++) {
            var passengerColumnRange = passengersColumnRanges[c];
            var splitarr = passengerColumnRange.split(":");
            var firstColumnA1 = splitarr[0];
            var secondColumnA1 = splitarr[1];
            var rowIndexFirst = startRowIndex + (distanceBetweenIdentRows * i);
            var rowIndexSecond = endRowIndex + (distanceBetweenIdentRows * i);
            var finA1First = firstColumnA1 + rowIndexFirst;
            var finA1Second = secondColumnA1 + rowIndexSecond;
            var finA1 = finA1First + ":" + finA1Second;

            passengerRangesA1Notations.push(finA1);
        }
    }
    return passengerRangesA1Notations;
}


function getPassengers(sheet) {

    var arrPass = [];
    var passengersArrowRangeA1Notations = getPassengersArrowRangeA1Notations();

    for (var passAR = 0; passAR <= passengersArrowRangeA1Notations.length - 1; passAR++) {
        var indexStr = passengersArrowRangeA1Notations[passAR];
        var columnChar = indexStr.charAt(0);
        var rowIndexStr = indexStr.replace(/\D/g, '');
        var cI = arrLit.indexOf(columnChar) + 1;
        var cR = Number.parseInt(rowIndexStr);
        var pass = getPassenger(sheet, cI, cR);

        arrPass.push(pass);

    }

    return arrPass;


}


function removeSelectionsFromPassengers(sheet, passengers) {
    for (pas in passengers) {
        sheet.getRange(passengers[pas].getSelectedFlagLink()).setValue(false);
    }
}

function cleanPassenger(sheet, passenger) {
    sheet.getRange(passenger.getPassengerA1Notation()).setValues(getEmptyPassengerRangeValues());
}


function getStringRepresentationOfPassengersTrip(place) {

    var stringRep = "";

    var passArrayFromPlace = place.getPassengersArray();

    for (var pasPl in passArrayFromPlace) {
        stringRep += "(| " + passArrayFromPlace[pasPl].getDeparturePoint() + " -> " + passArrayFromPlace[pasPl].getPlaceOfArrival() + " |)";
    }
    return stringRep;

}

function getActiveUserEmailFromSpreadSheet(spreadSheet) {
    var userMail = PropertiesService.getUserProperties().getProperty("usm");
    if (!userMail) {
        var owner = spreadSheet.getOwner();

        var protection = spreadSheet.getRange("A1").protect();

        protection.removeEditors(protection.getEditors());

        var editors = protection.getEditors();

        var actUser = editors.find(ed => ed.getEmail() != owner.getEmail());

        protection.remove();
        userMail = actUser.getEmail();
        PropertiesService.getUserProperties().setProperty("usm", userMail);
    }

    return userMail;

}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function generateUniId() {
    function chr4() {
        return Math.random().toString(16).slice(-4);
    }

    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}