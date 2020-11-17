function FILL_LIST_NAMES_COLUMN() {

    var arrListNamesRange = "L2:L100";
    var beginListIndex = 2;

    var reservedNames = new Map();
    reservedNames.set("CHECKLIST", 1);
    reservedNames.set("SPRINTER_CRAFTER", 1);
    reservedNames.set("OTAKAR", 1);
    reservedNames.set("TRAFIC", 1);
    reservedNames.set("SAMPLE", 1);
    reservedNames.set("PRICE", 1);
    reservedNames.set("LOG", 1);


    var spreadsheet = SpreadsheetApp.getActive().getSheetByName("CHECKLIST");

    spreadsheet.getRange(arrListNamesRange).setValue("");

    var arrFilteredSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets().filter(function (x) {
        if (reservedNames.get(x.getName()) == undefined) {
            return true;
        }

    });

    var arrNames = arrFilteredSheets.map(function (x) {
        return x.getName();
    });


    for (var ip in arrNames) {
        var rowIn = beginListIndex + Number.parseInt(ip);
        spreadsheet.getRange("L" + rowIn).setValue(arrNames[ip]);
    }


}

