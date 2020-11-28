function genComb() {

    var totalCitiesAmountRangeA1Notation = "Z2";
    var citiesRangeA1Notation;
    var totalCitiesAmountRange;
    var totalCitiesAmountRangeValue;
    var citiesRange;
    var citiesRangeValues;
    var spreadsheet = SpreadsheetApp.getActive();
    var sheet = spreadsheet.getSheetByName("PRICE");

    var citArr = [];

    totalCitiesAmountRange = sheet.getRange(totalCitiesAmountRangeA1Notation);
    totalCitiesAmountRangeValue = Number.parseInt(totalCitiesAmountRange.getValue());

    citiesRangeA1Notation = "Y2:Y" + (totalCitiesAmountRangeValue + 1);

    citiesRange = sheet.getRange(citiesRangeA1Notation);
    citiesRangeValues = citiesRange.getValues();

    for (var crv in citiesRangeValues) {
        citArr.push(citiesRangeValues[crv][0]);
    }

    destinationArrDub = [];
    var destinationArrDubFree = [];


    for (var pl in citArr) {
        var k = citArr[pl];
        var v;
        for (var lp in citArr) {
            v = citArr[lp];
            if (lp == pl) continue;
            var dir = new Direction(k, v);
            destinationArrDub.push(new Direction(k, v));
        }
    }

    for (var dp in destinationArrDub) {
        var des = destinationArrDub[dp];
        var plFrom = des.getFromPlace();
        var plTo = des.getToPlace();
        var dublFlag = false;
        for (var i in destinationArrDubFree) {
            var secPlFrom = destinationArrDubFree[i].getFromPlace();
            var secPlTo = destinationArrDubFree[i].getToPlace();

            if (plFrom == secPlTo && plTo == secPlFrom) {
                dublFlag = true;
            }
        }
        if (dublFlag == false) {
            destinationArrDubFree.push(des);
        }
    }

    var rowIndex = 2;
    var fPLitCol = "A";
    var sPLitCol = "C";
    for (var d in destinationArrDubFree) {

        var currDest = destinationArrDubFree[d];
        var fromPlaceA1Notation = fPLitCol + rowIndex.toString();
        var toPlaceA1Notation = sPLitCol + rowIndex.toString();

        sheet.getRange(fromPlaceA1Notation).setValue(currDest.getFromPlace());
        sheet.getRange(toPlaceA1Notation).setValue(currDest.getToPlace());

        rowIndex++;
    }


}
