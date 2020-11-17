function isInteger(num) {
    return (num ^ 0) === num;
}
function isNumber(num){
    return !Number.isNaN(num);
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function sendTestArray(array) {
    var formData = {
        'passengers': array,

    };
    var options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify(formData)
    };

    UrlFetchApp.fetch("https://poipo.free.beeceptor.com", options);
}

function checkValidPassengerRange(columnIndexOfActiveRange, rowIndexOfActiveRange) {

    var isValidRow = isInteger(((rowIndexOfActiveRange - 4) / 13));

    var isValidColumn = (mapOfColumnIndexesThatAllowedToSelect.get(arrLit[columnIndexOfActiveRange - 1]) !== undefined);

    return (isValidColumn && isValidRow);
}

function getPassengerPlaceNumberByActRangeRowIndex(rowIndexOfActiveRange) {
    return Math.floor((rowIndexOfActiveRange - 4) / 13) + 1;
}

function getEmptyPassengerRangeValues() {
    var rangeVal = [];
    rangeVal.push(["", "", ""]);
    rangeVal.push(["", ">", ""]);
    rangeVal.push(["", "", ""]);
    rangeVal.push(["БЕЗНАЛ", "", ""]);
    rangeVal.push(["", "", ""]);
    rangeVal.push(["", "", ""]);
    rangeVal.push(["", "", ""]);
    rangeVal.push(["", "", ""]);
    rangeVal.push(["", "", ""]);
    rangeVal.push(["BUSFOR", "", ""]);
    rangeVal.push(["", "", ""]);
    rangeVal.push(["", "", ""]);
    return rangeVal;
}

function getPassengersPlaceNumberMap(passengers) {

    var passPlacesMap = new Map();

    for (var pas in passengers) {
        var passengerToInsert = passengers[pas];
        if (passPlacesMap.has(passengerToInsert.getPlaceNumber())) {
            passPlacesMap.get(passengerToInsert.getPlaceNumber()).push(passengerToInsert);
        } else {
            var pArr = [];
            pArr.push(passengerToInsert);
            passPlacesMap.set(passengerToInsert.getPlaceNumber(), pArr);
        }
    }

    return passPlacesMap;

}

function getCrossingInterval(firstVectorIndexes , secondVectorIndexes){
    var crossingVector = [];
    if(firstVectorIndexes[0] <= secondVectorIndexes[0]){
        crossingVector.push(secondVectorIndexes[0]);
     }else crossingVector.push(firstVectorIndexes[0]);
    if(firstVectorIndexes[1] <= secondVectorIndexes[1]){
        crossingVector.push(firstVectorIndexes[1]);
    } else crossingVector.push(secondVectorIndexes[1]);

    return crossingVector;

}
function getRemoteCities(sheet) {
    var citArr = sheet.getRange(remoteCitiesA1Notation).getValues();
    var citiesToRet = [];
    for (var cit in citArr) {
        var st = citArr[cit][0];
        if (st != "") {
            citiesToRet.push(st);
        }
    }

    return citiesToRet;
}

function getCitiesMap(arrCities) {
    var mapCities = new Map();
    for (var cit = 0; cit <= arrCities.length - 1; cit++) {
        mapCities.set(arrCities[cit], cit);
    }

    return mapCities;
}