function SEND_DEFAULT_SMS() {

    const autoNameRange = "Q2";
    const driverNameRange = "R2";

    var smsSender = new SmsSender();

//  var sheet = SpreadsheetApp.getActiveSheet();

    var sheet = SpreadsheetApp.getActive().getActiveSheet();

    var autoName = sheet.getRange(autoNameRange).getValue();

    var driverName = sheet.getRange(driverNameRange).getValue();

    var messageText = Browser.inputBox('Разослать сообщение всем?', 'Свое сообщение', Browser.Buttons.OK_CANCEL);

    if (messageText === "cancel") return;

    if (messageText.split(' ').join('') === "") {
        messageText = "Vash avtobus : " + autoName + " !" + "Vash voditel : " + " " + driverName + "!";
    }

    if (autoName == "" || autoName == undefined || driverName == "" || driverName == undefined) {
        Browser.msgBox("Название автобуса или имя водителя не заполнены");
        return;
    }

    var arrPas = getValidPassengers(sheet);

    var phoneNumbersDub = arrPas.map(function (x) {
        return x.getPhoneNumber();
    });
    var phoneNumbers = Array.from(new Set(phoneNumbersDub));
    if (arrPas.length != 0) {

        var arrErrors = smsSender.sendSms(phoneNumbers, messageText);

        if (arrErrors.length == 0) {
            Browser.msgBox("Сообщения отправлены");
        } else {

            var stringWithErrors = "";
            for (var errIndex in arrErrors) {
                stringWithErrors = stringWithErrors.concat(("|" + "[" + arrErrors[errIndex].getPhoneNumber() + " " + ":" + " " + arrErrors[errIndex].getMessage() + "]" + "|"));
            }
            Browser.msgBox("Ошибки: " + stringWithErrors);
        }


    }

}

function SEND_ONE_SMS() {

    //Main Logic
    const autoNameRange = "Q2";
    const driverNameRange = "R2";

    var currentCell = SpreadsheetApp.getCurrentCell();

    var sheet = currentCell.getSheet();

    var autoName = sheet.getRange(autoNameRange).getValue();

    var driverName = sheet.getRange(driverNameRange).getValue();

    var columnIndexOfActiveRange = currentCell.getColumn();

    var rowIndexOfActiveRange = currentCell.getRow();

    if (checkValidPassengerRange(columnIndexOfActiveRange, rowIndexOfActiveRange)) {

        var passenger = getPassenger(sheet, columnIndexOfActiveRange, rowIndexOfActiveRange);

        var phoneNumbers = [];

        var clientPhoneNumber = sheet.getRange(passenger.getPhoneNumberLink()).getValue();

        phoneNumbers.push(clientPhoneNumber);

        var messageText = Browser.inputBox('Отправка сообщения', 'Введите текст сообщения', Browser.Buttons.OK_CANCEL);

        if (messageText === "cancel") return;

        if (messageText.split(' ').join('') === "") {
            messageText = "Vash avtobus : " + autoName + " !" + "Vash voditel : " + " " + driverName + "!";
            if (autoName == "" || autoName == undefined || driverName == "" || driverName == undefined) {
                Browser.msgBox("Название автобуса или имя водителя не заполнены");
                return;
            }
        }

        var smsSender = new SmsSender();

        var arrErrors = smsSender.sendSms(phoneNumbers, messageText);


        if (arrErrors.length == 0) {
            Browser.msgBox("Сообщения отправлены");
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


function SEND_TO_SELECTED_SMS() {

    const autoNameRange = "Q2";
    const driverNameRange = "R2";

    var smsSender = new SmsSender();

//  var sheet = SpreadsheetApp.getActiveSheet();

    var sheet = SpreadsheetApp.getActive().getActiveSheet();

    var autoName = sheet.getRange(autoNameRange).getValue();

    var driverName = sheet.getRange(driverNameRange).getValue();

    var messageText = Browser.inputBox('Разослать сообщение всем?', 'Свое сообщение', Browser.Buttons.OK_CANCEL);

    if (messageText === "cancel") return;

    if (messageText.split(' ').join('') === "") {
        messageText = "Vash avtobus : " + autoName + " !" + "Vash voditel : " + " " + driverName + "!";
    }

    if (autoName == "" || autoName == undefined || driverName == "" || driverName == undefined) {
        Browser.msgBox("Название автобуса или имя водителя не заполнены");
        return;
    }

    var arrPas = getSelectedPassengers(sheet);

    var phoneNumbers = arrPas.map(function (x) {
        return x.getPhoneNumber();
    });


    if (arrPas.length != 0) {

        var arrErrors = smsSender.sendSms(phoneNumbers, messageText);

        if (arrErrors.length == 0) {
            Browser.msgBox("Сообщения отправлены");
            removeSelectionsFromPassengers(sheet, arrPas);
        } else {

            var stringWithErrors = "";
            for (var errIndex in arrErrors) {
                stringWithErrors = stringWithErrors.concat(("|" + "[" + arrErrors[errIndex].getPhoneNumber() + " " + ":" + " " + arrErrors[errIndex].getMessage() + "]" + "|"));
            }
            Browser.msgBox("Ошибки: " + stringWithErrors);
        }


    }

}






