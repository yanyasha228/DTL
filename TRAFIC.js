function TRAFIC() {

    var tableNameForLink = "H5";

    var totalPlacesAmount = 10;

    var citiesColumnRangeForClear = "A3:A61";

    var arrExtraPlacesRangeForClear = ["Y6:Y60", "AA6:AA60"];

    var citiesRange;

    var arrCities;

    var mapCities;

    var arrPlaces;

    var arrPassengers;

    var arrExtraPlaces;

    var arrExtraPassengers;

    function instantiateCities(remoteSheet) {
        arrCities = [];
        mapCities = new Map();
        var i = 0;
        for (var blankCity = 0; blankCity <= arrRemoteCitiesLinks.length - 1; blankCity++) {
            var cityRemVal = remoteSheet.getRange(arrRemoteCitiesLinks[blankCity]).getValue().trim();
            if (cityRemVal !== "") {
                arrCities.push(new City(arrLocalCitiesLinks[i], cityRemVal));
                i++;
            }
            for (var cit = 0; cit <= arrCities.length - 1; cit++) {
                mapCities.set(arrCities[cit].getCityValue(), cit);
            }
        }
    }

    function instantiatePlaces() {

        arrPlaces = [];
        arrExtraPlaces = [];


        //ExtraPlacesInit

        arrExtraPlaces.push(new ExtraPlace("Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12"));
        arrExtraPlaces.push(new ExtraPlace("AA6", "AA7", "AA8", "AA9", "AA10", "AA11", "AA12"));
        arrExtraPlaces.push(new ExtraPlace("Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Y20"));
        arrExtraPlaces.push(new ExtraPlace("AA14", "AA15", "AA16", "AA17", "AA18", "AA19", "AA20"));
        arrExtraPlaces.push(new ExtraPlace("Y22", "Y23", "Y24", "Y25", "Y26", "Y27", "Y28"));
        arrExtraPlaces.push(new ExtraPlace("AA22", "AA23", "AA24", "AA25", "AA26", "AA27", "AA28"));
        arrExtraPlaces.push(new ExtraPlace("Y30", "Y31", "Y32", "Y33", "Y34", "Y35", "Y36"));
        arrExtraPlaces.push(new ExtraPlace("AA30", "AA31", "AA32", "AA33", "AA34", "AA35", "AA36"));
        arrExtraPlaces.push(new ExtraPlace("Y38", "Y39", "Y40", "Y41", "Y42", "Y43", "Y44"));
        arrExtraPlaces.push(new ExtraPlace("AA38", "AA39", "AA40", "AA41", "AA42", "AA43", "AA44"));
        arrExtraPlaces.push(new ExtraPlace("Y46", "Y47", "Y48", "Y49", "Y50", "Y51", "Y52"));
        arrExtraPlaces.push(new ExtraPlace("AA46", "AA47", "AA48", "AA49", "AA50", "AA51", "AA52"));
        arrExtraPlaces.push(new ExtraPlace("Y54", "Y55", "Y56", "Y57", "Y58", "Y59", "Y60"));
        arrExtraPlaces.push(new ExtraPlace("AA54", "AA55", "AA56", "AA57", "AA58", "AA59", "AA60"));

        //Places init
        //1
        arrPlaces.push(new Place("J6", "J7", "J8", "J9", "J10", "J11", "J12"));
//2
        arrPlaces.push(new Place("L6", "L7", "L8", "L9", "L10", "L11", "L12"));
//3
        arrPlaces.push(new Place("H14", "H15", "H16", "H17", "H18", "H19", "H20"));
//4
        arrPlaces.push(new Place("J14", "J15", "J16", "J17", "J18", "J19", "J20"));
//5
        arrPlaces.push(new Place("L14", "L15", "L16", "L17", "L18", "L19", "L20"));
//6
        arrPlaces.push(new Place("H22", "H23", "H24", "H25", "H26", "H27", "H28"));
//7
        arrPlaces.push(new Place("J22", "J23", "J24", "J25", "J26", "J27", "J28"));
//8
        arrPlaces.push(new Place("H30", "H31", "H32", "H33", "H34", "H35", "H36"));
//9
        arrPlaces.push(new Place("J30", "J31", "J32", "J33", "J34", "J35", "J36"));
        //10
        arrPlaces.push(new Place("L30", "L31", "L32", "L33", "L34", "L35", "L36"));

    }

    function tiePassengersAndPlaces(sheet) {
        var pasArr = getPassengers(sheet);

        arrPassengers = pasArr.filter(pas => pas.getPlaceNumber() <= totalPlacesAmount);
        arrExtraPassengers = pasArr.filter(exPas => exPas.getPlaceNumber() > totalPlacesAmount);

        for (var pln in arrPlaces) {
            var currentPlace = arrPlaces[pln];
            var arrPasToIns = arrPassengers.filter(pas => (pas.getPlaceNumber() == Number.parseInt(pln) + 1));
            currentPlace.setPassengersArray(arrPasToIns);
            if (currentPlace.getPassengersArray().length !== 0) {
                currentPlace.setShownPassenger(currentPlace.getPassengersArray()[0])
            }
        }
    }

    function validatePassengers(spreadSheet, passArray) {


        for (var pas in passArray) {

            var checkPhoneNumber = spreadSheet.getRange(passArray[pas].getPhoneNumberLink()).getValue();

            if (checkPhoneNumber != "") {
                passArray[pas].setDeparturePoint(spreadSheet.getRange(passArray[pas].getDeparturePointLink()).getValue());
                passArray[pas].setPlaceOfArrival(spreadSheet.getRange(passArray[pas].getPlaceOfArrivalLink()).getValue());
                passArray[pas].setPhoneNumber(checkPhoneNumber);
                passArray[pas].setFullName(spreadSheet.getRange(passArray[pas].getFullNameLink()).getValue());
                passArray[pas].setPaymentOption(spreadSheet.getRange(passArray[pas].getPaymentOptionLink()).getValue());
                passArray[pas].setPrice(spreadSheet.getRange(passArray[pas].getPriceLink()).getValue());
            }

        }

    }

//function display(spreadSh, tableName){
//
//  var tableLink = "=" + tableName + "!";
//  for(var pl in arrPlaces){
// spreadSh.getRange(arrPlaces[pl].getDeparturePointLink()).setValue(tableLink + arrPlaces[pl].getShownPassenger().getDeparturePointLink());
//    spreadSh.getRange(arrPlaces[pl].getPlaceOfArrivalLink()).setValue(tableLink + arrPlaces[pl].getShownPassenger().getPlaceOfArrivalLink());
//    spreadSh.getRange(arrPlaces[pl].getPhoneNumberLink()).setValue(tableLink + arrPlaces[pl].getShownPassenger().getPhoneNumberLink());
//    spreadSh.getRange(arrPlaces[pl].getFullNameLink()).setValue(tableLink + arrPlaces[pl].getShownPassenger().getFullNameLink());
//    spreadSh.getRange(arrPlaces[pl].getPaymentOptionLink()).setValue(tableLink + arrPlaces[pl].getShownPassenger().getPaymentOptionLink());
//    spreadSh.getRange(arrPlaces[pl].getPriceLink()).setValue(tableLink + arrPlaces[pl].getShownPassenger().getPriceLink());
//  }
//  
//}

    function display(spreadSh) {

        //Cleaning extra places
        for (var exPl in arrExtraPlacesRangeForClear) {
            spreadSh.getRange(arrExtraPlacesRangeForClear[exPl]).setValue("")
        }


        for (var extraPl in arrExtraPlaces) {


            if (arrExtraPlaces[extraPl].getShownPassenger() == undefined) break;

            spreadSh.getRange(arrExtraPlaces[extraPl].getPlaceNumberLink()).setValue(arrExtraPlaces[extraPl].getShownPassenger().getPlaceNumber());
            spreadSh.getRange(arrExtraPlaces[extraPl].getDeparturePointLink()).setValue(arrExtraPlaces[extraPl].getShownPassenger().getDeparturePoint());
            spreadSh.getRange(arrExtraPlaces[extraPl].getPlaceOfArrivalLink()).setValue(arrExtraPlaces[extraPl].getShownPassenger().getPlaceOfArrival());
            spreadSh.getRange(arrExtraPlaces[extraPl].getPhoneNumberLink()).setValue(arrExtraPlaces[extraPl].getShownPassenger().getPhoneNumber());
            spreadSh.getRange(arrExtraPlaces[extraPl].getFullNameLink()).setValue(arrExtraPlaces[extraPl].getShownPassenger().getFullName());
            spreadSh.getRange(arrExtraPlaces[extraPl].getPaymentOptionLink()).setValue(arrExtraPlaces[extraPl].getShownPassenger().getPaymentOption());
            spreadSh.getRange(arrExtraPlaces[extraPl].getPriceLink()).setValue(arrExtraPlaces[extraPl].getShownPassenger().getPrice());
        }

        for (var pl in arrPlaces) {
            if (arrPlaces[pl].getShownPassenger() != undefined) {
                spreadSh.getRange(arrPlaces[pl].getDeparturePointLink()).setValue(arrPlaces[pl].getShownPassenger().getDeparturePoint());
                spreadSh.getRange(arrPlaces[pl].getPlaceOfArrivalLink()).setValue(arrPlaces[pl].getShownPassenger().getPlaceOfArrival());
                spreadSh.getRange(arrPlaces[pl].getPhoneNumberLink()).setValue(arrPlaces[pl].getShownPassenger().getPhoneNumber());
                spreadSh.getRange(arrPlaces[pl].getFullNameLink()).setValue(arrPlaces[pl].getShownPassenger().getFullName());
                spreadSh.getRange(arrPlaces[pl].getPaymentOptionLink()).setValue(arrPlaces[pl].getShownPassenger().getPaymentOption());
                spreadSh.getRange(arrPlaces[pl].getPriceLink()).setValue(arrPlaces[pl].getShownPassenger().getPrice());
                spreadSh.getRange(arrPlaces[pl].getPlaceNumberLink()).setNote(getStringRepresentationOfPassengersTrip(arrPlaces[pl]));
            }
        }


    }

    function displayCities(spreadSh) {
        spreadSh.getRange(citiesColumnRangeForClear).setValue("");
        for (var cit in arrCities) {
            spreadSh.getRange(arrCities[cit].getCityLocalLink()).setValue(arrCities[cit].getCityValue());
        }
    }

    function checkCitiesHighlightingAndSetCitiesRangeIfExist(sheet) {

        var highLighghtAmount = 0;
        var highLightedCellsArr = [];
        for (var lop = 0; lop <= arrCities.length - 1; lop++) {
            var back = sheet.getRange(arrCities[lop].getCityLocalLink()).getBackground();

            if (back !== "#ffffff") {
                highLightedCellsArr.push(arrCities[lop]);
                var i = 0;
            }
        }
        if (highLightedCellsArr.length == 1 || highLightedCellsArr.length > 2) {
            Browser.msgBox("Неправильное выделение городов");
            return;
        } else if (highLightedCellsArr.length != 0) {
            citiesRange = new CitiesRange(highLightedCellsArr[0], highLightedCellsArr[1]);
            return;
        }

        citiesRange = new CitiesRange(arrCities[0], arrCities[arrCities.length - 1]);

    }

    function validatePlacesWithCitiesRange() {

        var emptyPassenger = new Passenger();

        emptyPassenger.setDeparturePoint("");
        emptyPassenger.setPlaceOfArrival("");
        emptyPassenger.setPhoneNumber("");
        emptyPassenger.setFullName("");
        emptyPassenger.setPaymentOption("");
        emptyPassenger.setPrice("");

        for (var pl in arrPlaces) {

            var indexOfDeparturePointInRange = mapCities.get(citiesRange.getBeginCity().getCityValue());
            var indexOfPlaceOfArrivalInRange = mapCities.get(citiesRange.getEndCity().getCityValue());
            var placeIter = arrPlaces[pl];
            var passengersArrayIter = arrPlaces[pl].getPassengersArray();
            var foundPassengersInRangeAmount = 0;
            for (var pas in passengersArrayIter) {
                var passengerIter = passengersArrayIter[pas];
                var depText = passengerIter.getDeparturePoint();
                var indexOfPassengerDeparturePoint = mapCities.get(passengerIter.getDeparturePoint());
                var indexOfPassengerPlaceOfArrival = mapCities.get(passengerIter.getPlaceOfArrival());
                if (indexOfPassengerDeparturePoint !== undefined && indexOfPassengerPlaceOfArrival !== undefined) {

                    if (indexOfPassengerDeparturePoint < indexOfPlaceOfArrivalInRange && indexOfPassengerPlaceOfArrival > indexOfDeparturePointInRange) {
                        if (foundPassengersInRangeAmount == 0) {
                            placeIter.setShownPassenger(passengerIter);
                            foundPassengersInRangeAmount++;
                        } else {
                            var inPassengerDeparturePoint = mapCities.get(placeIter.getShownPassenger().getDeparturePoint());
                            var inPassengerPlaceOfArrivalPoint = mapCities.get(placeIter.getShownPassenger().getPlaceOfArrival());

                            if (inPassengerPlaceOfArrivalPoint > indexOfPassengerDeparturePoint && inPassengerDeparturePoint < indexOfPassengerPlaceOfArrival) {
                                arrExtraPassengers.push(passengerIter);
                            }
                        }


                    }
                }
                if (passengersArrayIter.length - 1 == pas && foundPassengersInRangeAmount == 0) {
                    placeIter.setShownPassenger(emptyPassenger);
                }

            }
        }
    }

    function fillExtraPlaces() {
        if (arrExtraPassengers.length > 0) {
            for (var exPl in arrExtraPlaces) {
                if (arrExtraPassengers.length - 1 < exPl) break;
                arrExtraPlaces[exPl].setShownPassenger(arrExtraPassengers[exPl]);
            }
        }
    }


    ///MainLogic
    var spreadsheet = SpreadsheetApp.getActive().getSheetByName("TRAFIC");

    var spreadsheetNameFor = spreadsheet.getRange(tableNameForLink).getValue();

    if (spreadsheetNameFor == "" || spreadsheetNameFor == undefined) return;

    var spreadsheetFor = SpreadsheetApp.getActive().getSheetByName(spreadsheetNameFor);

    instantiateCities(spreadsheetFor);

    displayCities(spreadsheet);

    instantiatePlaces();

    tiePassengersAndPlaces(spreadsheetFor);

    validatePassengers(spreadsheetFor, arrPassengers);

    checkCitiesHighlightingAndSetCitiesRangeIfExist(spreadsheet);

    validatePlacesWithCitiesRange();

    fillExtraPlaces();

    display(spreadsheet);


};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TRAFIC_CLEAR() {

    var tableNameForLink = "H5";

    var citiesColumnRangeForClear = "A3:A61";

    var arrExtraPlacesRangeForClear = ["Y6:Y60", "AA6:AA60"];

    var arrPlaces;


    var arrExtraPlaces;


    function instantiatePlaces() {

        arrPlaces = [];
        arrExtraPlaces = [];


        //ExtraPlacesInit

        arrExtraPlaces.push(new ExtraPlace("Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12"));
        arrExtraPlaces.push(new ExtraPlace("AA6", "AA7", "AA8", "AA9", "AA10", "AA11", "AA12"));
        arrExtraPlaces.push(new ExtraPlace("Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Y20"));
        arrExtraPlaces.push(new ExtraPlace("AA14", "AA15", "AA16", "AA17", "AA18", "AA19", "AA20"));
        arrExtraPlaces.push(new ExtraPlace("Y22", "Y23", "Y24", "Y25", "Y26", "Y27", "Y28"));
        arrExtraPlaces.push(new ExtraPlace("AA22", "AA23", "AA24", "AA25", "AA26", "AA27", "AA28"));
        arrExtraPlaces.push(new ExtraPlace("Y30", "Y31", "Y32", "Y33", "Y34", "Y35", "Y36"));
        arrExtraPlaces.push(new ExtraPlace("AA30", "AA31", "AA32", "AA33", "AA34", "AA35", "AA36"));
        arrExtraPlaces.push(new ExtraPlace("Y38", "Y39", "Y40", "Y41", "Y42", "Y43", "Y44"));
        arrExtraPlaces.push(new ExtraPlace("AA38", "AA39", "AA40", "AA41", "AA42", "AA43", "AA44"));
        arrExtraPlaces.push(new ExtraPlace("Y46", "Y47", "Y48", "Y49", "Y50", "Y51", "Y52"));
        arrExtraPlaces.push(new ExtraPlace("AA46", "AA47", "AA48", "AA49", "AA50", "AA51", "AA52"));
        arrExtraPlaces.push(new ExtraPlace("Y54", "Y55", "Y56", "Y57", "Y58", "Y59", "Y60"));
        arrExtraPlaces.push(new ExtraPlace("AA54", "AA55", "AA56", "AA57", "AA58", "AA59", "AA60"));

        //Places init
        //1
        arrPlaces.push(new Place("J6", "J7", "J8", "J9", "J10", "J11", "J12"));
//2
        arrPlaces.push(new Place("L6", "L7", "L8", "L9", "L10", "L11", "L12"));
//3
        arrPlaces.push(new Place("H14", "H15", "H16", "H17", "H18", "H19", "H20"));
//4
        arrPlaces.push(new Place("J14", "J15", "J16", "J17", "J18", "J19", "J20"));
//5
        arrPlaces.push(new Place("L14", "L15", "L16", "L17", "L18", "L19", "L20"));
//6
        arrPlaces.push(new Place("H22", "H23", "H24", "H25", "H26", "H27", "H28"));
//7
        arrPlaces.push(new Place("J22", "J23", "J24", "J25", "J26", "J27", "J28"));
//8
        arrPlaces.push(new Place("H30", "H31", "H32", "H33", "H34", "H35", "H36"));
//9
        arrPlaces.push(new Place("J30", "J31", "J32", "J33", "J34", "J35", "J36"));
        //10
        arrPlaces.push(new Place("L30", "L31", "L32", "L33", "L34", "L35", "L36"));


    }

    function clear(spreadSheet) {
        spreadSheet.getRange(citiesColumnRangeForClear).setValue("");

        for (var pl in arrPlaces) {
            spreadSheet.getRange(arrPlaces[pl].getDeparturePointLink() + ":" + arrPlaces[pl].getPriceLink()).setValue("");
            spreadSheet.getRange(arrPlaces[pl].getPlaceNumberLink()).setNote("Номер места");
        }
        for (var exPl in arrExtraPlacesRangeForClear) {
            spreadSheet.getRange(arrExtraPlacesRangeForClear[exPl]).setValue("")
        }
        spreadsheet.getRange(tableNameForLink).setValue("");
    }

    ///MainLogic
    var spreadsheet = SpreadsheetApp.getActive().getSheetByName("TRAFIC");

    instantiatePlaces();
    clear(spreadsheet);


};

