function CitiesRange(beginCity, endCity) {
    this.beginCity = beginCity;
    this.endCity = endCity;
}

CitiesRange.prototype.getBeginCity = function () {
    return this.beginCity;
};

CitiesRange.prototype.getEndCity = function () {
    return this.endCity;
};


function City(cityLocalLink, cityValue) {
    this.cityLocalLink = cityLocalLink;
    this.cityValue = cityValue;
}

City.prototype.getCityLocalLink = function () {
    return this.cityLocalLink;
};

City.prototype.getCityValue = function () {
    return this.cityValue;
};

City.prototype.setCityValue = function (cityValue) {
    this.cityValue = cityValue;
};

function Direction(fromPlace, toPlace, price) {
    this.fromPlace = fromPlace;
    this.toPlace = toPlace;
    this.price = price;
}

Direction.prototype.getPrice = function () {
    return this.price;
}
Direction.prototype.setPrice = function (price) {
    this.price = price;
}
Direction.prototype.getFromPlace = function () {
    return this.fromPlace;
}
Direction.prototype.getToPlace = function () {
    return this.toPlace;
}

Direction.prototype.setFromPlace = function (fromPlace) {
    this.fromPlace = fromPlace;
}

Direction.prototype.setToPlace = function (toPlace) {
    this.toPlace = toPlace;
}


function Cell(departurePointLink, placeOfArrivalLink, phoneNumberLink, paymentOptionLink, fullNameLink, priceLink, commentLink) {

    this.departurePointLink = departurePointLink;
    this.departurePoint = "";

    this.placeOfArrivalLink = placeOfArrivalLink;
    this.placeOfArrival = "";

    this.phoneNumberLink = phoneNumberLink;
    this.phoneNumber = "";

    this.paymentOptionLink = paymentOptionLink;
    this.paymentOption = "";

    this.fullNameLink = fullNameLink;
    this.fullName = "";

    this.paymentOptionLink = paymentOptionLink;
    this.paymentOption = "";

    this.priceLink = priceLink;
    this.price = "";

    this.commentLink = commentLink;
    this.comment = "";

}

// Cell getters


Cell.prototype.getComment = function () {
    return this.comment;
};

Cell.prototype.getDeparturePoint = function () {
    return this.departurePoint;
};

Cell.prototype.getPlaceOfArrival = function () {
    return this.placeOfArrival;
};

Cell.prototype.getPhoneNumber = function () {
    return this.phoneNumber;
};

Cell.prototype.getFullName = function () {
    return this.fullName;
};

Cell.prototype.getPaymentOption = function () {
    return this.paymentOption;
};

Cell.prototype.getPrice = function () {
    return this.price;
};

Cell.prototype.getDeparturePointLink = function () {
    return this.departurePointLink;
};

Cell.prototype.getPlaceOfArrivalLink = function () {
    return this.placeOfArrivalLink;
};

Cell.prototype.getPhoneNumberLink = function () {
    return this.phoneNumberLink;
};

Cell.prototype.getFullNameLink = function () {
    return this.fullNameLink;
};

Cell.prototype.getPaymentOptionLink = function () {
    return this.paymentOptionLink;
};

Cell.prototype.getPriceLink = function () {
    return this.priceLink;
};

Cell.prototype.getCommentLink = function () {
    return this.commentLink;
}
//Cell setters

Cell.prototype.setComment = function (comment) {
    this.comment = comment;
};

Cell.prototype.setDeparturePoint = function (departurePoint) {
    this.departurePoint = departurePoint;
};
Cell.prototype.setPlaceOfArrival = function (placeOfArrival) {
    this.placeOfArrival = placeOfArrival;
};

Cell.prototype.setPhoneNumber = function (phoneNumber) {
    this.phoneNumber = phoneNumber;
};

Cell.prototype.setFullName = function (fullName) {
    this.fullName = fullName;
};

Cell.prototype.setPaymentOption = function (paymentOption) {
    this.paymentOption = paymentOption;
};

Cell.prototype.setPrice = function (price) {
    this.price = price;
};

Cell.prototype.setCommentLink = function (commentLink) {
    this.commentLink = commentLink;
};

Cell.prototype.setDeparturePointLink = function (departurePointLink) {
    this.departurePointLink = departurePointLink;
};
Cell.prototype.setPlaceOfArrivalLink = function (placeOfArrivalLink) {
    this.placeOfArrivalLink = placeOfArrivalLink;
};

Cell.prototype.setPhoneNumberLink = function (phoneNumberLink) {
    this.phoneNumberLink = phoneNumberLink;
};

Cell.prototype.setFullNameLink = function (fullNameLink) {
    this.fullNameLink = fullNameLink;
};

Cell.prototype.setPaymentOptionLink = function (paymentOptionLink) {
    this.paymentOptionLink = paymentOptionLink;
};

Cell.prototype.setPriceLink = function (priceLink) {
    this.priceLink = priceLink;
};


//Place CL
function Place(placeNumberLink, departurePointLink, placeOfArrivalLink, phoneNumberLink, paymentOptionLink, fullNameLink, priceLink, passengersArray, shownPassenger) {

    Cell.call(this, departurePointLink, placeOfArrivalLink, phoneNumberLink, paymentOptionLink, fullNameLink, priceLink)

    this.passengersArray = passengersArray;

    this.shownPassenger = shownPassenger;

    this.placeNumberLink = placeNumberLink;

}


Place.prototype = Object.create(Cell.prototype);

Place.prototype.getPlaceNumberLink = function () {
    return this.placeNumberLink;
};

Place.prototype.getPassengersArray = function () {
    return this.passengersArray;
};

Place.prototype.setPassengersArray = function (passengersArray) {
    this.passengersArray = passengersArray;
};

Place.prototype.setShownPassenger = function (shownPassenger) {

    this.shownPassenger = shownPassenger;

};

Place.prototype.getShownPassenger = function () {
    return this.shownPassenger;
};

//ExtraPlace cl
function ExtraPlace(placeNumberLink,
                    departurePointLink,
                    placeOfArrivalLink,
                    phoneNumberLink,
                    paymentOptionLink,
                    fullNameLink,
                    priceLink) {

    Cell.call(this,
        departurePointLink,
        placeOfArrivalLink,
        phoneNumberLink,
        paymentOptionLink,
        fullNameLink,
        priceLink)

    this.placeNumberLink = placeNumberLink;

    this.shownPassenger;

}

ExtraPlace.prototype = Object.create(Cell.prototype);

ExtraPlace.prototype.setShownPassenger = function (shownPassenger) {

    this.shownPassenger = shownPassenger;

};

ExtraPlace.prototype.getShownPassenger = function () {
    return this.shownPassenger;
};

ExtraPlace.prototype.getPlaceNumberLink = function () {
    return this.placeNumberLink;
};


//Passenger cl
function Passenger(departurePointLink,
                   placeOfArrivalLink,
                   phoneNumberLink,
                   paymentOptionLink,
                   fullNameLink,
                   priceLink,
                   managerIdLink,
                   sourceIdLink,
                   ticketIdLink,
                   promoIdLink,
                   idLink,
                   transferTripNameStartLink,
                   transferTripNameEndLink) {

    Cell.call(this,
        departurePointLink,
        placeOfArrivalLink,
        phoneNumberLink,
        paymentOptionLink,
        fullNameLink,
        priceLink);


    this.id;

    this.transferTripNameStart;

    this.transferTripNameEnd;

    this.transferTripNameStartLink;

    this.transferTripNameEndLink;

    this.selectedFlag;

    this.selectedFlagLink;

    this.passengerA1Notation;

    this.idLink = idLink;

    this.placeNumber;

    this.managerIdLink = managerIdLink;

    this.managerId;

    this.sourceIdLink = sourceIdLink;

    this.sourceId;

    this.ticketIdLink = ticketIdLink;

    this.ticketId;

    this.promoIdLink = promoIdLink;

    this.promoId;


}

Passenger.prototype = Object.create(Cell.prototype);

Passenger.prototype.setTransferTripNameEnd = function (transferTripNameEnd){
    this.transferTripNameEnd = transferTripNameEnd;
}
Passenger.prototype.setTransferTripNameStart = function (transferTripNameStart){
    this.transferTripNameStart = transferTripNameStart;
}

Passenger.prototype.setTransferTripNameEndLink = function (transferTripNameEndLink){
    this.transferTripNameEndLink = transferTripNameEndLink;
}
Passenger.prototype.setTransferTripNameStartLink = function (transferTripNameStartLink){
    this.transferTripNameStartLink = transferTripNameStartLink;
}

Passenger.prototype.setSelectedFlag = function (selectedFlag) {
    this.selectedFlag = selectedFlag;
}
Passenger.prototype.setSelectedFlagLink = function (selectedFlagLink) {
    this.selectedFlagLink = selectedFlagLink;
}
Passenger.prototype.setPassengerA1Notation = function (passengerA1Notation) {
    this.passengerA1Notation = passengerA1Notation;
}
Passenger.prototype.setIdLink = function (idLink) {
    this.idLink = idLink;
}

Passenger.prototype.setId = function (id) {
    this.id = id;
}

Passenger.prototype.setTicketId = function (ticketId) {
    this.ticketId = ticketId;
};

Passenger.prototype.setPromoId = function (promoId) {
    this.promoId = promoId;
};

Passenger.prototype.setSourceId = function (sourceId) {
    this.sourceId = sourceId;
}
Passenger.prototype.setManagerId = function (managerId) {
    this.managerId = managerId;
}

Passenger.prototype.setTicketIdLink = function (ticketIdLink) {
    this.ticketIdLink = ticketIdLink;
};
Passenger.prototype.setPromoIdLink = function (promoIdLink) {
    this.promoIdLink = promoIdLink;
}
Passenger.prototype.setManagerIdLink = function (managerLink) {
    this.managerIdLink = managerLink;
};
Passenger.prototype.setSourceIdLink = function (sourceLink) {
    this.sourceIdLink = sourceLink;
};

Passenger.prototype.getTransferTripNameEnd = function (){
    return this.transferTripNameEnd;
}
Passenger.prototype.getTransferTripNameStart = function (){
    return this.transferTripNameStart;
}

Passenger.prototype.getTransferTripNameEndLink = function (){
    return this.transferTripNameEndLink;
}
Passenger.prototype.getTransferTripNameStartLink = function (){
    return this.transferTripNameStartLink;
}

Passenger.prototype.getSelectedFlag = function () {
    return this.selectedFlag;
};

Passenger.prototype.getSelectedFlagLink = function () {
    return this.selectedFlagLink;
}

Passenger.prototype.getPassengerA1Notation = function () {
    return this.passengerA1Notation;
}
Passenger.prototype.getIdLink = function () {
    return this.idLink;
}
Passenger.prototype.getId = function () {
    return this.id;
}
Passenger.prototype.getPromoId = function () {
    return this.promoId;
}
Passenger.prototype.getManagerId = function () {
    return this.managerId;
}
Passenger.prototype.getSourceId = function () {
    return this.sourceId;
}
Passenger.prototype.getTicketId = function () {
    return this.ticketId;
}
Passenger.prototype.getTicketIdLink = function () {
    return this.ticketIdLink;
};
Passenger.prototype.getPromoIdLink = function () {
    return this.promoIdLink;
};
Passenger.prototype.getManagerIdLink = function () {
    return this.managerIdLink;
};
Passenger.prototype.getSourceIdLink = function () {
    return this.sourceIdLink;
};

Passenger.prototype.getPlaceNumber = function () {
    return this.placeNumber;
};
Passenger.prototype.setPlaceNumber = function (placeNumber) {
    this.placeNumber = placeNumber;
};

function SmsSender() {

}

function SmsSendError(phoneNumber, errMessage) {

    this.phoneNumber = phoneNumber;

    this.message = errMessage;

}

SmsSendError.prototype.getPhoneNumber = function () {
    return this.phoneNumber;
};
SmsSendError.prototype.getMessage = function () {
    return this.message;
};

SmsSender.prototype.sendSms = function (phoneNumbers, message) {

    var arrNumbers = [];

    var arrErrors = [];

    var numbArr = Math.ceil(phoneNumbers.length / 100);

    for (var i = 0; i < numbArr; i++) {

        var sliceBeginIndex = 100 * i;

        var sliceEndIndex = sliceBeginIndex + 100;

        arrNumbers.push(phoneNumbers.slice(sliceBeginIndex, sliceEndIndex));

    }

    for (var nums in arrNumbers) {

        var headers = {
            'Authorization': 'Bearer ' + smsClubAuthToken
        };

        var formData = {
            'phone': arrNumbers[nums],
            'message': message,
            'src_addr': smsClubAlterName
        };

        var options = {
            'method': 'post',
            'contentType': 'application/json',
            'headers': headers,
            'payload': JSON.stringify(formData)
        };

        var responseErrInfo = JSON.parse(UrlFetchApp.fetch(smsClubApiSendUrl, options).getContentText()).success_request.add_info;


        if (responseErrInfo !== undefined) {
            for (var errIn in responseErrInfo) {
                arrErrors.push(new SmsSendError(errIn, responseErrInfo[errIn]))
            }
        }
    }

    return arrErrors;
};

