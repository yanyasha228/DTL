var mapOfColumnIndexesThatAllowedToSelect = new Map();

var smsClubAuthToken = 'q1GeLjJJvEEh3FA';

var passengersArrowRangeA1NotationsString = "E4,I4,M4,E17,I17,M17,E30,I30,M30,E43,I43,M43,E56,I56,M56,E69,I69,M69,E82,I82,M82,E95,I95,M95,E108,I108,M108,E121,I121,M121,E134,I134,M134,E147,I147,M147,E160,I160,M160,E173,I173,M173,E186,I186,M186,E199,I199,M199,E212,I212,M212,E225,I225,M225,E238,I238,M238,E251,I251,M251,E264,I264,M264,E277,I277,M277,E290,I290,M290,E303,I303,M303,E316,I316,M316,E329,I329,M329,E342,I342,M342,E355,I355,M355,E368,I368,M368,E381,I381,M381,E394,I394,M394,E407,I407,M407,E420,I420,M420,E433,I433,M433,E446,I446,M446,E459,I459,M459,E472,I472,M472,E485,I485,M485,E498,I498,M498,E511,I511,M511,E524,I524,M524,E537,I537,M537,E550,I550,M550,E563,I563,M563,E576,I576,M576,E589,I589,M589,E602,I602,M602,E615,I615,M615,E628,I628,M628,E641,I641,M641,E654,I654,M654,E667,I667,M667,E680,I680,M680,E693,I693,M693,E706,I706,M706,E719,I719,M719,E732,I732,M732,E745,I745,M745,E758,I758,M758,E771,I771,M771,E784,I784,M784,E797,I797,M797,E810,I810,M810,E823,I823,M823,E836,I836,M836,E849,I849,M849,E862,I862,M862,E875,I875,M875,E888,I888,M888,E901,I901,M901,E914,I914,M914,E927,I927,M927,E940,I940,M940,E953,I953,M953,E966,I966,M966,E979,I979,M979,E992,I992,M992,E1005,I1005,M1005,E1018,I1018,M1018,E1031,I1031,M1031,E1043,I1043,M1043";
var smsClubApiSendUrl = 'https://im.smsclub.mobi/sms/send';

var smsClubAlterName = 'DenTrans';

mapOfColumnIndexesThatAllowedToSelect.set("E", 1);
mapOfColumnIndexesThatAllowedToSelect.set("I", 1);
mapOfColumnIndexesThatAllowedToSelect.set("M", 1);
mapOfColumnIndexesThatAllowedToSelect.set("Q", 1);
mapOfColumnIndexesThatAllowedToSelect.set("U", 1);

var arrLit = [];
arrLit.push("A");
arrLit.push("B");
arrLit.push("C");
arrLit.push("D");
arrLit.push("E");
arrLit.push("F");
arrLit.push("G");
arrLit.push("H");
arrLit.push("I");
arrLit.push("J");
arrLit.push("K");
arrLit.push("L");
arrLit.push("M");
arrLit.push("N");
arrLit.push("O");
arrLit.push("P");
arrLit.push("Q");
arrLit.push("R");
arrLit.push("S");
arrLit.push("T");
arrLit.push("U");
arrLit.push("V");
arrLit.push("W");
arrLit.push("X");

var remoteCitiesA1Notation = "P3:P60";

var arrRemoteCitiesLinks = [];
arrRemoteCitiesLinks.push("X3");
arrRemoteCitiesLinks.push("X6");
arrRemoteCitiesLinks.push("X9");
arrRemoteCitiesLinks.push("X12");
arrRemoteCitiesLinks.push("X15");
arrRemoteCitiesLinks.push("X18");
arrRemoteCitiesLinks.push("X21");
arrRemoteCitiesLinks.push("X24");
arrRemoteCitiesLinks.push("X27");
arrRemoteCitiesLinks.push("X30");
arrRemoteCitiesLinks.push("X33");
arrRemoteCitiesLinks.push("X36");
arrRemoteCitiesLinks.push("X39");
arrRemoteCitiesLinks.push("X42");
arrRemoteCitiesLinks.push("X45");
arrRemoteCitiesLinks.push("X48");
arrRemoteCitiesLinks.push("X51");
arrRemoteCitiesLinks.push("X54");
arrRemoteCitiesLinks.push("X57");
arrRemoteCitiesLinks.push("X60");

var arrLocalCitiesLinks = [];
arrLocalCitiesLinks.push("A4");
arrLocalCitiesLinks.push("A7");
arrLocalCitiesLinks.push("A10");
arrLocalCitiesLinks.push("A13");
arrLocalCitiesLinks.push("A16");
arrLocalCitiesLinks.push("A19");
arrLocalCitiesLinks.push("A22");
arrLocalCitiesLinks.push("A25");
arrLocalCitiesLinks.push("A28");
arrLocalCitiesLinks.push("A31");
arrLocalCitiesLinks.push("A34");
arrLocalCitiesLinks.push("A37");
arrLocalCitiesLinks.push("A40");
arrLocalCitiesLinks.push("A43");
arrLocalCitiesLinks.push("A46");
arrLocalCitiesLinks.push("A49");
arrLocalCitiesLinks.push("A52");
arrLocalCitiesLinks.push("A55");
arrLocalCitiesLinks.push("A58");
arrLocalCitiesLinks.push("A61");
