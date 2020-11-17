function GET_PASSENGERS_AS_TEXT() {

    const autoNameRange = "Y2";
    const driverNameRange = "Z2";

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

    var arrPas = getPassengers(sheet);


}