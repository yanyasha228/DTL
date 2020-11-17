function BOOK() {

    //Main Logic
    const autoNameRange = "Q2";
    const driverNameRange = "R2";
    const placesColumnA1Notation = "G";
    const placesAddressColumnA1Notation = "H";
    var placesRangeA1Notation = "G2:";
    var placesAddressRangeA1Notation = "H2:";
    var totalCitiesAmountRangeA1Notation = "Z2";
    var arrPlaces;
    var arrPlaceAddress;
    var placesAddressMap = new Map();
    var arrErrorsManagersSending = [];

    var smsNotificationHour = 22;

    var managersNotificationHour = 19;

    const infListName = "PRICE";

    var infSheet = SpreadsheetApp.getActive().getSheetByName(infListName);


    var totalCitiesAmount = Number.parseInt(infSheet.getRange(totalCitiesAmountRangeA1Notation).getValue());

    placesRangeA1Notation = placesRangeA1Notation + (placesColumnA1Notation + (totalCitiesAmount + 1));
    placesAddressRangeA1Notation = placesAddressRangeA1Notation + (placesAddressColumnA1Notation + (totalCitiesAmount + 1));

    arrPlaces = infSheet.getRange(placesRangeA1Notation).getValues();

    arrPlaceAddress = infSheet.getRange(placesAddressRangeA1Notation).getValues();

    for (var pl in arrPlaces) {
        placesAddressMap.set(arrPlaces[pl][0], arrPlaceAddress[pl][0]);
    }

    var currentCell = SpreadsheetApp.getCurrentCell();

    var sheet = currentCell.getSheet();

    var columnIndexOfActiveRange = currentCell.getColumn();

    var rowIndexOfActiveRange = currentCell.getRow();

    if (checkValidPassengerRange(columnIndexOfActiveRange, rowIndexOfActiveRange)) {
        var passenger = getValidPassenger(sheet, columnIndexOfActiveRange, rowIndexOfActiveRange);

        // var validPassengers = getSelectedPassengers(sheet);
        //
        // Logger.log(validPassengers);

        var phoneNumbers = [];

        var clientPhoneNumber = passenger.getPhoneNumber();

        phoneNumbers.push(clientPhoneNumber);

        var bookMessageText = "Ваши места забронированны! Место посадки: " + placesAddressMap.get(passenger.getDeparturePoint()) + "! Спасибо, что выбрали DenTrans!";

        var smsSender = new SmsSender();

        var arrErrors = smsSender.sendSms(phoneNumbers, bookMessageText);


        if (new Date().getHours() >= smsNotificationHour) {
            var autoName = sheet.getRange(autoNameRange).getValue();

            var driverName = sheet.getRange(driverNameRange).getValue();

            var messageText;


            messageText = "Vash avtobus : " + autoName + " !" + "Vash voditel : " + " " + driverName + "!";
            if (autoName == "" || autoName == undefined || driverName == "" || driverName == undefined) {
                Browser.msgBox("Название автобуса или имя водителя не заполнены");
                return;
            }


            arrErrors.push(smsSender.sendSms(phoneNumbers, messageText));
        }

        if (new Date().getHours() >= managersNotificationHour) {
            arrErrorsManagersSending = newPassengerManagersSmsNotification(sheet, passenger);
        }

        if (arrErrors.length == 0) {
            Browser.msgBox("Сообщения отправлены");
            if (arrErrorsManagersSending.length != 0) {
                Browser.msgBox("Менеджеры не были уведомлены");
            }

        } else {

            var stringWithErrors = "";
            for (var errIndex in arrErrors) {
                stringWithErrors = stringWithErrors.concat(("|" + "[" + arrErrors[errIndex].getPhoneNumber() + " " + ":" + " " + arrErrors[errIndex].getMessage() + "]" + "|"));
            }
            Browser.msgBox("Ошибки: " + stringWithErrors);
        }

    } else {
        Browser.msgBox("Выберите ячейку над пассажиром с символом \" > \" ");
    }
}
