function CLEAN_ONE() {

    var currentCell = SpreadsheetApp.getCurrentCell();
    var mailsForSending = "dentransoper@googlegroups.com";

    //Main Logic

    var currentCell = SpreadsheetApp.getCurrentCell();

    var sheet = currentCell.getSheet();

    var spreadsheet = SpreadsheetApp.getActive();

    var columnIndexOfActiveRange = currentCell.getColumn();

    var columnIndex = arrLit[columnIndexOfActiveRange - 1];

    var rowIndexOfActiveRange = currentCell.getRow();

    var spreadSheetUrl = spreadsheet.getUrl();

    var sheetId = sheet.getSheetId();

    var activeRangeName = columnIndex + rowIndexOfActiveRange;

    if (checkValidPassengerRange(columnIndexOfActiveRange, rowIndexOfActiveRange)) {

        var passenger = getPassenger(sheet, columnIndexOfActiveRange, rowIndexOfActiveRange);
        cleanPassenger(sheet, passenger);

        // if (passenger.getPhoneNumber() != "") {
        //     var mailBody = "Направление: " + "<b>" + passenger.getDeparturePoint() + " -> " + passenger.getPlaceOfArrival() + "</b>" + "<br>" +
        //         "Номер места: " + "<b>" + passenger.getPlaceNumber() + "</b>" + "<br>" +
        //         "Телефон: " + "<b>" + passenger.getPhoneNumber() + "</b>" + "<br>" +
        //         "Способ оплаты: " + "<b>" + passenger.getPaymentOption() + "</b>" + "<br>" +
        //         "ФИО: " + "<b>" + passenger.getFullName() + "</b>" + "<br>" +
        //         "Цена билета: " + "<b>" + passenger.getPrice() + "</b>" + "<br>" +
        //         "Комментарий: " + "<b>" + passenger.getComment() + "</b>" + "<br>" +
        //         "Менеджер: " + "<b>" + passenger.getManagerId() + "</b>" + "<br>" +
        //         "Источник: " + "<b>" + passenger.getSourceId() + "</b>" + "<br>" +
        //         "Номер билета: " + "<b>" + passenger.getTicketId() + "</b>" + "<br>" +
        //         "Промо: " + "<b>" + passenger.getPromoId() + "</b>" + "<br>" +
        //         "Ссылка : " + spreadSheetUrl + "#" + "gid=" + sheetId + "&" + "range=" + activeRangeName;
        //
        //     MailApp.sendEmail({
        //         to: mailsForSending,
        //         subject: "Удален пассажир: " + sheet.getName() + ":" + activeRangeName,
        //         htmlBody: mailBody
        //     });
        // }
    } else {
        Browser.msgBox("Выберите ячейку над пассажиром с символом \" > \" ");
    }


}

function DELETE_SELECTED() {

    var smsSender = new SmsSender();

//  var sheet = SpreadsheetApp.getActiveSheet();

    var sheet = SpreadsheetApp.getActive().getActiveSheet();

    var arrPas = getSelectedPassengers(sheet);

    var phoneNumbers = arrPas.map(function (x) {
        return x.getPhoneNumber();
    });


    if (arrPas.length != 0) {

        deletePassengers(sheet, arrPas);
    }

}

function REMOVE_ALL_SELECTIONS(){
    var sheet = SpreadsheetApp.getActive().getActiveSheet();
    removeAllSelections(sheet);
}
  
