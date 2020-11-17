function MAKE_WORKSHEETS() {

    var spreadsheet = SpreadsheetApp.getActive();

    var dateStartA1 = "B9";
    var dateEndA1 = "D9";

    var dateStart = Number.parseInt(spreadsheet.getRange(dateStartA1).getValue());
    var dateEnd = Number.parseInt(spreadsheet.getRange(dateEndA1).getValue());

    var allSheets = spreadsheet.getSheets();

    var arrSheetsNames = allSheets.map(function (x) {
        return x.getName();
    });
    var sampleSheets = allSheets.filter(function (x) {
        var splitedName = x.getName().split("_");

        if (splitedName[0] == "S") {
            return true;
        }

    });

    // var arrSamleSheetsNames = samplesShaeets.map(function (x) {
    //     return x.getName();
    // });

    for (var d = dateStart; d <= dateEnd; d++) {
        for (var sh in sampleSheets) {
            var sampleSheetName = sampleSheets[sh].getName();
            var spName;
            var genSheetName;
            if (sampleSheetName.includes(" (копия)")) {

                spreadsheet.deleteSheet(spreadsheet.getSheetByName(sampleSheetName));
                continue;
            }
            spName = sampleSheetName.split("_");
            genSheetName = d + "_" + spName[1];
            if (arrSheetsNames.indexOf(genSheetName) == -1) {
                var tz = spreadsheet.getSheetByName(sampleSheetName);
                var mz = tz.copyTo(spreadsheet);
                mz.setName(genSheetName);
            }

        }

    }

    spreadsheet.getRange(dateStartA1).setValue("");
    spreadsheet.getRange(dateEndA1).setValue("");
}

function DELETE_WORKSHEETS() {

    var spreadsheet = SpreadsheetApp.getActive();

    var dateStartA1 = "F9";
    var dateEndA1 = "H9";

    var dateStart = Number.parseInt(spreadsheet.getRange(dateStartA1).getValue());
    var dateEnd = Number.parseInt(spreadsheet.getRange(dateEndA1).getValue());

    var allSheets = spreadsheet.getSheets();

    var sheetsToDelete = allSheets.filter(function (x) {
        var splitedName = x.getName().split("_");
        var dateParam = splitedName[0];
        if (isNumber(dateParam)) {
            var dateParamNum = Number.parseInt(dateParam);
            if (dateParamNum >= dateStart && dateParamNum <= dateEnd) return true;
        }

    });

    for (var sh in sheetsToDelete) {
        spreadsheet.deleteSheet(sheetsToDelete[sh]);
    }

    spreadsheet.getRange(dateStartA1).setValue("");
    spreadsheet.getRange(dateEndA1).setValue("");

}

function TRANSFER_SHEETS() {

    var spreadsheet = SpreadsheetApp.getActive();
    var dateStartA1 = "J9";
    var dateEndA1 = "L9";
    var spreadsheetUrlToTransferA1 = "J11";
    var spreadsheetUrlToTransfer = spreadsheet.getRange(spreadsheetUrlToTransferA1).getValue();
    var dateStart = Number.parseInt(spreadsheet.getRange(dateStartA1).getValue());
    var dateEnd = Number.parseInt(spreadsheet.getRange(dateEndA1).getValue());

    var spreadsheetForTransfer = SpreadsheetApp.openByUrl(spreadsheetUrlToTransfer);

    var allSheets = spreadsheet.getSheets();

    var sheetFromNames = spreadsheetForTransfer.getSheets().map(function (x) {
        return x.getName();
    });

    var sheetsToTransfer = allSheets.filter(function (x) {
        var splitedName = x.getName().split("_");
        var dateParam = splitedName[0];
        if (isNumber(dateParam)) {
            var dateParamNum = Number.parseInt(dateParam);
            if (dateParamNum >= dateStart && dateParamNum <= dateEnd) return true;
        }

    });

    for (var sh in sheetsToTransfer) {
        var sheetToTr = sheetsToTransfer[sh];
        if (sheetFromNames.indexOf(sheetToTr.getName()) == -1) {
            var sFT = sheetToTr.copyTo(spreadsheetForTransfer);
            sFT.setName(sheetToTr.getName());
        }
    }

    spreadsheet.getRange(dateStartA1).setValue("");
    spreadsheet.getRange(dateEndA1).setValue("");

}
