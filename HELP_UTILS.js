function newPassengerManagersSmsNotification(sheet, passenger) {
    var checkList = SpreadsheetApp.getActive().getSheetByName("CHECKLIST");
    var managersPhoneNumbersRangeA1 = "P2:P10";
    var sheetName = sheet.getName();
    var sheetDate = Number.parseInt(sheetName.split("_")[0]);
    var day = new Date().getUTCDate();

    if (day == sheetDate) {
        var smsNotificationHour = 19;
        var phoneNumbersArrForSmsSending = checkList.getRange(managersPhoneNumbersRangeA1).getValues().map(x => {
            return x[0][0];
        }).filter(num !="");

        // var phoneNumbersArrForSmsSending = ['380960438553', '380500175784'];

        if (new Date().getHours() >= smsNotificationHour) {
            var smsSender = new SmsSender();
            return smsSender.sendSms(phoneNumbersArrForSmsSending,
                "Новый пассажир: " + sheetName + ":" + "." +
                " Номер:" + passenger.getPhoneNumber() + "."
                + " №:" + getPassengerPlaceNumberByActRangeRowIndex(rowIndex) + "." + " Направление : " + passenger.getDeparturePoint() + " > ");

        }


    }

};

function newPassengerManagersMailNotification(sheet, passenger) {
    var mailsForSending = "dentransoper@googlegroups.com";
    var sheetName = sheet.getName();

    var spreadSheetUrl = spreadsheet.getUrl();
    var sheetId = sheet.getSheetId();
    var mailBody = "Место : " + "<b>" + passenger.getPlaceNumber() + "</b>" + "<br>"
        + "Ссылка : " + spreadSheetUrl + "#" + "gid=" + sheetId + "&" + "range=" + activeRangeName;

    MailApp.sendEmail({
        to: mailsForSending,
        subject: "Новый пассажир: " + activeSheetName + ":" + activeRangeName,
        htmlBody: mailBody
    });


};

function DIRECTION_PRICE_AUTOFILL() {
    var spreadsheet = SpreadsheetApp.getActive();
    var sheet = spreadsheet.getActiveSheet();
    // var rangeString = 'D2,F2,H2,J2,L2,N2,P2,R2,T2,V2,D13,F13,H13,J13,L13,N13,P13,R13,T13,V13,D24,F24,H24,J24,L24,N24,P24,R24,T24,V24,D35,F35,H35,J35,L35,N35,P35,R35,T35,V35,D46,F46,H46,J46,L46,N46,P46,R46,T46,V46,D57,F57,H57,J57,L57,N57,P57,R57,T57,V57,D68,F68,H68,J68,L68,N68,P68,R68,T68,V68,D79,F79,H79,J79,L79,N79,P79,R79,T79,V79,D90,F90,H90,J90,L90,N90,P90,R90,T90,V90,D101,F101,H101,J101,L101,N101,P101,R101,T101,V101,D112,F112,H112,J112,L112,N112,P112,R112,T112,V112,D123,F123,H123,J123,L123,N123,P123,R123,T123,V123,D134,F134,H134,J134,L134,N134,P134,R134,T134,V134,D145,F145,H145,J145,L145,N145,P145,R145,T145,V145,D156,F156,H156,J156,L156,N156,P156,R156,T156,V156,D167,F167,H167,J167,L167,N167,P167,R167,T167,V167,D178,F178,H178,J178,L178,N178,P178,R178,T178,V178,D189,F189,H189,J189,L189,N189,P189,R189,T189,V189,D200,F200,H200,J200,L200,N200,P200,R200,T200,V200,D211,F211,H211,J211,L211,N211,P211,R211,T211,V211,D222,F222,H222,J222,L222,N222,P222,R222,T222,V222,D233,F233,H233,J233,L233,N233,P233,R233,T233,V233,D244,F244,H244,J244,L244,N244,P244,R244,T244,V244,D255,F255,H255,J255,L255,N255,P255,R255,T255,V255,D266,F266,H266,J266,L266,N266,P266,R266,T266,V266,D277,F277,H277,J277,L277,N277,P277,R277,T277,V277,D288,F288,H288,J288,L288,N288,P288,R288,T288,V288,D299,F299,H299,J299,L299,N299,P299,R299,T299,V299,D310,F310,H310,J310,L310,N310,P310,R310,T310,V310,D321,F321,H321,J321,L321,N321,P321,R321,T321,V321,D332,F332,H332,J332,L332,N332,P332,R332,T332,V332,D343,F343,H343,J343,L343,N343,P343,R343,T343,V343,D354,F354,H354,J354,L354,N354,P354,R354,T354,V354,D365,F365,H365,J365,L365,N365,P365,R365,T365,V365,D376,F376,H376,J376,L376,N376,P376,R376,T376,V376,D387,F387,H387,J387,L387,N387,P387,R387,T387,V387,D398,F398,H398,J398,L398,N398,P398,R398,T398,V398,D409,F409,H409,J409,L409,N409,P409,R409,T409,V409,D420,F420,H420,J420,L420,N420,P420,R420,T420,V420,D431,F431,H431,J431,L431,N431,P431,R431,T431,V431,D442,F442,H442,J442,L442,N442,P442,R442,T442,V442,D453,F453,H453,J453,L453,N453,P453,R453,T453,V453,D464,F464,H464,J464,L464,N464,P464,R464,T464,V464,D475,F475,H475,J475,L475,N475,P475,R475,T475,V475,D486,F486,H486,J486,L486,N486,P486,R486,T486,V486,D497,F497,H497,J497,L497,N497,P497,R497,T497,V497,D508,F508,H508,J508,L508,N508,P508,R508,T508,V508,D519,F519,H519,J519,L519,N519,P519,R519,T519,V519,D530,F530,H530,J530,L530,N530,P530,R530,T530,V530,D541,F541,H541,J541,L541,N541,P541,R541,T541,V541,D552,F552,H552,J552,L552,N552,P552,R552,T552,V552,D563,F563,H563,J563,L563,N563,P563,R563,T563,V563,D574,F574,H574,J574,L574,N574,P574,R574,T574,V574,D585,F585,H585,J585,L585,N585,P585,R585,T585,V585,D596,F596,H596,J596,L596,N596,P596,R596,T596,V596,D607,F607,H607,J607,L607,N607,P607,R607,T607,V607,D618,F618,H618,J618,L618,N618,P618,R618,T618,V618,D629,F629,H629,J629,L629,N629,P629,R629,T629,V629,D640,F640,H640,J640,L640,N640,P640,R640,T640,V640,D651,F651,H651,J651,L651,N651,P651,R651,T651,V651';

    var rangeString = 'D4,H4,L4,P4,T4,D15,H15,L15,P15,T15,D26,H26,L26,P26,T26,D37,H37,L37,P37,T37,D48,H48,L48,P48,T48,D59,H59,L59,P59,T59,D70,H70,L70,P70,T70,D81,H81,L81,P81,T81,D92,H92,L92,P92,T92,D103,H103,L103,P103,T103,D114,H114,L114,P114,T114,D125,H125,L125,P125,T125,D136,H136,L136,P136,T136,D147,H147,L147,P147,T147,D158,H158,L158,P158,T158,D169,H169,L169,P169,T169,D180,H180,L180,P180,T180,D191,H191,L191,P191,T191,D202,H202,L202,P202,T202,D213,H213,L213,P213,T213,D224,H224,L224,P224,T224,D235,H235,L235,P235,T235,D246,H246,L246,P246,T246,D257,H257,L257,P257,T257,D268,H268,L268,P268,T268,D279,H279,L279,P279,T279,D290,H290,L290,P290,T290,D301,H301,L301,P301,T301,D312,H312,L312,P312,T312,D323,H323,L323,P323,T323,D334,H334,L334,P334,T334,D345,H345,L345,P345,T345,D356,H356,L356,P356,T356,D367,H367,L367,P367,T367,D378,H378,L378,P378,T378,D389,H389,L389,P389,T389,D400,H400,L400,P400,T400,D411,H411,L411,P411,T411,D422,H422,L422,P422,T422,D433,H433,L433,P433,T433,D444,H444,L444,P444,T444,D455,H455,L455,P455,T455,D466,H466,L466,P466,T466,D477,H477,L477,P477,T477,D488,H488,L488,P488,T488,D499,H499,L499,P499,T499,D510,H510,L510,P510,T510,D521,H521,L521,P521,T521,D532,H532,L532,P532,T532,D543,H543,L543,P543,T543,D554,H554,L554,P554,T554,D565,H565,L565,P565,T565,D576,H576,L576,P576,T576,D587,H587,L587,P587,T587,D598,H598,L598,P598,T598,D609,H609,L609,P609,T609,D620,H620,L620,P620,T620,D631,H631,L631,P631,T631,D642,H642,L642,P642,T642,D653,H653,L653,P653,T653';
    var rangesArr = rangeString.split(",");
    var activeRange = spreadsheet.getActiveRange();
    var activeRangeName = activeRange.getA1Notation().split(":")[0];
    var activeSheetName = spreadsheet.getActiveSheet().getName();
    var rowIndex = activeRange.getRowIndex();
    var firstColumnRangeA1Notation = "A2:A";
    var secondColumnRangeA1Notation = "C2:C";
    var pricesColumnRangeA1Notation = "D2:D";

    new Date().getDa


    for (var i in rangesArr) {
        if (rangesArr[i] == activeRangeName) {
            var rangeValue = activeRange.getValue();
            if (rangeValue != "" && rangeValue != "БЕЗНАЛ") {

                var passengerArrowRange = findPassengerArrowRangeByPassengerPaymentOptionRange(sheet, activeRange);
                var passengerFromSheet = getPassenger(sheet, passengerArrowRange.getColumn(), passengerArrowRange.getRowIndex());
                if (passengerFromSheet.getDeparturePoint() != "" && passengerFromSheet.getPlaceOfArrival() != "") {
                    var direcrionsArr = [];
                    var passDirection = new Direction(passengerFromSheet.getDeparturePoint(), passengerFromSheet.getPlaceOfArrival())
                    var priceSheet = SpreadsheetApp.getActive().getSheetByName("PRICE");
                    var placesTotalAmount = Number.parseInt(priceSheet.getRange("E2").getValue());
                    var lastValidRowIndex = placesTotalAmount + 1;


                    var firstColumnPlacesArr = priceSheet.getRange(firstColumnRangeA1Notation + lastValidRowIndex.toString()).getValues();
                    var secondColumnPlacesArr = priceSheet.getRange(secondColumnRangeA1Notation + lastValidRowIndex.toString()).getValues();
                    var pricesColumnArr = priceSheet.getRange(pricesColumnRangeA1Notation + lastValidRowIndex.toString()).getValues();

                    for (var cd = 0; cd < placesTotalAmount; cd++) {
                        direcrionsArr.push(new Direction(firstColumnPlacesArr[cd][0], secondColumnPlacesArr[cd][0], pricesColumnArr[cd][0]));
                    }

                    for (var dir = 0; dir < placesTotalAmount; dir++) {
                        var currDirection = direcrionsArr[dir];
                        if ((passDirection.getFromPlace() == currDirection.getFromPlace() && passDirection.getToPlace() == currDirection.getToPlace()) ||
                            (passDirection.getFromPlace() == currDirection.getToPlace() && passDirection.getToPlace() == currDirection.getFromPlace())) {
                            sheet.getRange(passengerFromSheet.getPriceLink()).setValue(currDirection.getPrice());
                        }

                    }

                    var spreadSheetUrl = spreadsheet.getUrl();
                    var sheetId = sheet.getSheetId();
                }
            }
            break;
        }
    }


};
