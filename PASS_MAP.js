function MAP() {

    var citiesColumnsAmount = 18;
    var citiesA1 = "F6:W6";
    var tableNameForLink = "E5";
    var beginPlaceStartColumn = "F";
    var beginPlaceStartColumnArrLitIndex = arrLit.indexOf("F");
    var beginPlacesStartRow = 6;
    var beginPassStartRow = 7;
    var arrCities;
    var mapCities;
    var arrPassengers;
    var passengersPlacesMap;
    // var a1ColorsMap;
    const redColorHex = "#ff0000";
    const greenColorHex = "#00ff00"
    const violetColorHex = "#ee82ee";

    function displayCities(spreadsheet, arrCities) {
        var arrCitClone = arrCities.slice();
        var difCitSize = (citiesColumnsAmount - arrCitClone.length);
        for (var i = 0; i < difCitSize; i++) {
            arrCitClone.push("");
        }
        var valArrCit = [];
        valArrCit.push(arrCitClone);
        spreadsheet.getRange(citiesA1).setValues(valArrCit);
    }

    function displayPassengersIntervals(sheet, a1ColorsMap) {
        for (var [key, value] of a1ColorsMap) {
            var a1Arr = Array.from(value);
            for (var a1 in a1Arr) {
                ////////////////////////////////////////////////////////////////////////////////////
                sheet.getRange(a1Arr[a1]).setBackground(key);
            }
        }
    }

    function getPassengersIntervalsColorMap(passMap) {
        var a1ColorsMap = new Map();
        a1ColorsMap.set(greenColorHex, new Set());
        a1ColorsMap.set(violetColorHex, new Set());
        a1ColorsMap.set(redColorHex, new Set());
        for (const [key, value] of passMap.entries()) {
            var placePassArr = value;
            for (var pr in placePassArr) {
                var firstPass = placePassArr[pr];
                var rowIndex = ((beginPassStartRow + firstPass.getPlaceNumber()) - 1);
//////////////////?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                var cityIndexOfDeparturePointFirstPass = mapCities.get(firstPass.getDeparturePoint());
                var cityIndexOfPlaceOfArrivalFirstPass = mapCities.get(firstPass.getPlaceOfArrival());

                for (var pr1 in placePassArr) {
                    var secondPass = placePassArr[pr1];
                    if (pr == pr1) continue;

                    var cityIndexOfDeparturePointSecondPass = mapCities.get(secondPass.getDeparturePoint());
                    var cityIndexOfPlaceOfArrivalSecondPass = mapCities.get(secondPass.getPlaceOfArrival());

                    if (cityIndexOfDeparturePointSecondPass < cityIndexOfPlaceOfArrivalFirstPass && cityIndexOfPlaceOfArrivalSecondPass > cityIndexOfDeparturePointFirstPass) {

                        var crossingInterval = getCrossingInterval([cityIndexOfDeparturePointFirstPass, cityIndexOfPlaceOfArrivalFirstPass], [cityIndexOfDeparturePointSecondPass, cityIndexOfPlaceOfArrivalSecondPass]);

                        // if (cityIndexOfDeparturePointSecondPass < cityIndexOfPlaceOfArrivalFirstPass) {
                        var colIndexFirstErrF = beginPlaceStartColumnArrLitIndex + crossingInterval[0];
                        var colIndexSecondErrF = beginPlaceStartColumnArrLitIndex + crossingInterval[1];
                        var a1FirstIndexErrF = arrLit[colIndexFirstErrF] + rowIndex;
                        var a1SecondIndexErrF = arrLit[colIndexSecondErrF] + rowIndex;
                        var a1ToPaintErrF = a1FirstIndexErrF + ":" + a1SecondIndexErrF;
                        a1ColorsMap.get(redColorHex).add(a1ToPaintErrF);
                        //     }
                        // } else if (cityIndexOfPlaceOfArrivalSecondPass > cityIndexOfDeparturePointSecondPass) {
                        //     var colIndexFirstErrS = beginPlaceStartColumnArrLitIndex + cityIndexOfDeparturePointSecondPass;
                        //     var colIndexSecondErrS = beginPlaceStartColumnArrLitIndex + cityIndexOfPlaceOfArrivalSecondPass;
                        //     var a1FirstIndexErrS = arrLit[colIndexFirstErrS] + rowIndex;
                        //     var a1SecondIndexErrS = arrLit[colIndexSecondErrS] + rowIndex;
                        //     var a1ToPaintErrS = a1FirstIndexErrS + ":" + a1SecondIndexErrS;
                        //     a1ColorsMap.get(redColorHex).add(a1ToPaintErrS);
                        // }

                    }

                    if (cityIndexOfDeparturePointFirstPass <= cityIndexOfDeparturePointSecondPass && cityIndexOfPlaceOfArrivalSecondPass <= cityIndexOfPlaceOfArrivalFirstPass) {
                        var colIndexFirstErrS = beginPlaceStartColumnArrLitIndex + cityIndexOfDeparturePointSecondPass;
                        var colIndexSecondErrS = beginPlaceStartColumnArrLitIndex + cityIndexOfPlaceOfArrivalSecondPass;
                        var a1FirstIndexErrS = arrLit[colIndexFirstErrS] + rowIndex;
                        var a1SecondIndexErrS = arrLit[colIndexSecondErrS] + rowIndex;
                        var a1ToPaintErrS = a1FirstIndexErrS + ":" + a1SecondIndexErrS;
                        a1ColorsMap.get(redColorHex).add(a1ToPaintErrS);
                    }
                }

                var colIndexFirstErr = beginPlaceStartColumnArrLitIndex + cityIndexOfDeparturePointFirstPass;
                var colIndexSecondErr = beginPlaceStartColumnArrLitIndex + cityIndexOfPlaceOfArrivalFirstPass;
                var a1FirstIndexErr = arrLit[colIndexFirstErr] + rowIndex;
                var a1SecondIndexErr = arrLit[colIndexSecondErr] + rowIndex;
                var a1ToPaintErr = a1FirstIndexErr + ":" + a1SecondIndexErr;
                if (firstPass.getPaymentOption() == "БЕЗНАЛ") {
                    a1ColorsMap.get(greenColorHex).add(a1ToPaintErr);
                } else {
                    a1ColorsMap.get(violetColorHex).add(a1ToPaintErr);
                }
            }

        }

        return a1ColorsMap;
    }

    MAP_CLEAR();
    var spreadsheet = SpreadsheetApp.getActive().getSheetByName("LOG");

    var spreadsheetNameFor = spreadsheet.getRange(tableNameForLink).getValue();

    if (spreadsheetNameFor == "" || spreadsheetNameFor == undefined) return;

    var spreadsheetFor = SpreadsheetApp.getActive().getSheetByName(spreadsheetNameFor);
    arrCities = getRemoteCities(spreadsheetFor);
    mapCities = getCitiesMap(arrCities);
    arrPassengers = getValidPassengers(spreadsheetFor);
    passengersPlacesMap = getPassengersPlaceNumberMap(arrPassengers);

    displayCities(spreadsheet, arrCities);
    displayPassengersIntervals(spreadsheet, getPassengersIntervalsColorMap(passengersPlacesMap));


}

function MAP_CLEAR(){
    var rangeForClearA1 = "F7:W86";
    var citiesRangeForClearA1 = "F:W6";
    var spreadsheet = SpreadsheetApp.getActive().getSheetByName("LOG");

    spreadsheet.getRange(citiesRangeForClearA1).setValue("");
    spreadsheet.getRange(rangeForClearA1).setBackground("");
}
