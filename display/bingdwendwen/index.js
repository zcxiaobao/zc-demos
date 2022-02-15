// 缩放参数为3
const SCALE = 3;
// 对测量参数进行缩放
function scaleParam(x) {
  return x / SCALE;
}

// 根据缩放参数封装一下几个函数
function bezierCurveTo(ctx, ...args) {
  ctx.bezierCurveTo(...args.map(scaleParam));
}
function moveTo(ctx, ...args) {
  ctx.moveTo(...args.map(scaleParam));
}
function quadraticCurveTo(ctx, ...args) {
  ctx.quadraticCurveTo(...args.map(scaleParam));
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 轮廓
ctx.beginPath();
moveTo(ctx, 497, 462);
bezierCurveTo(ctx, 452, 380, 497, 184, 666, 297);
bezierCurveTo(ctx, 792, 255, 921, 261, 1017, 278);
bezierCurveTo(ctx, 1127, 155, 1227, 305, 1183, 404);
bezierCurveTo(ctx, 1208, 443, 1238, 488, 1254, 544);
bezierCurveTo(ctx, 1251, 421, 1503, 398, 1472, 577);
bezierCurveTo(ctx, 1407, 758, 1336, 789, 1279, 876);
bezierCurveTo(ctx, 1270, 924, 1255, 1044, 1147, 1222);
bezierCurveTo(ctx, 1098, 1372, 1211, 1454, 1031, 1457);
bezierCurveTo(ctx, 877, 1469, 892, 1434, 901, 1376);
bezierCurveTo(ctx, 924, 1313, 783, 1324, 802, 1378);
bezierCurveTo(ctx, 822, 1432, 819, 1467, 691, 1469);
bezierCurveTo(ctx, 571, 1473, 569, 1448, 571, 1332);
bezierCurveTo(ctx, 572, 1218, 530, 1226, 464, 1038);
bezierCurveTo(ctx, 386, 1244, 233, 1115, 272, 1017);
bezierCurveTo(ctx, 306, 916, 365, 845, 407, 777);
bezierCurveTo(ctx, 433, 669, 449, 545, 497, 462);
ctx.stroke();

// 左耳
ctx.beginPath();
moveTo(ctx, 526, 437);
bezierCurveTo(ctx, 498, 263, 667, 325, 641, 329);
quadraticCurveTo(ctx, 600, 343, 526, 437);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 右耳
ctx.beginPath();
moveTo(ctx, 1050, 285);
bezierCurveTo(ctx, 1144, 232, 1167, 342, 1162, 387);
quadraticCurveTo(ctx, 1119, 317, 1050, 285);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 左手
ctx.beginPath();
moveTo(ctx, 417, 804);
bezierCurveTo(ctx, 430, 837, 435, 914, 457, 968);
bezierCurveTo(ctx, 445, 1016, 440, 1022, 428, 1053);
bezierCurveTo(ctx, 396, 1142, 307, 1112, 304, 1048);
quadraticCurveTo(ctx, 300, 987, 418, 803);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 右手
ctx.beginPath();
moveTo(ctx, 1267, 593);
bezierCurveTo(ctx, 1275, 584, 1279, 574, 1280, 555);
bezierCurveTo(ctx, 1282, 448, 1480, 477, 1429, 575);
bezierCurveTo(ctx, 1403, 621, 1374, 689, 1287, 757);
quadraticCurveTo(ctx, 1291, 693, 1267, 594);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 左脚
ctx.beginPath();
moveTo(ctx, 585, 1231);
bezierCurveTo(ctx, 626, 1261, 776, 1297, 792, 1336);
bezierCurveTo(ctx, 756, 1387, 838, 1427, 710, 1428);
bezierCurveTo(ctx, 505, 1431, 644, 1381, 585, 1231);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 右脚
ctx.beginPath();
moveTo(ctx, 910, 1342);
bezierCurveTo(ctx, 981, 1318, 938, 1293, 1125, 1226);
bezierCurveTo(ctx, 1087, 1370, 1172, 1404, 1014, 1420);
bezierCurveTo(ctx, 875, 1425, 959, 1403, 910, 1342);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 左黑眼圈
ctx.beginPath();
moveTo(ctx, 806, 552);
bezierCurveTo(ctx, 706, 492, 512, 681, 603, 777);
bezierCurveTo(ctx, 738, 882, 896, 600, 806, 552);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 右黑眼圈
ctx.beginPath();
moveTo(ctx, 989, 541);
bezierCurveTo(ctx, 1080, 477, 1251, 684, 1168, 768);
bezierCurveTo(ctx, 1077, 837, 893, 607, 989, 541);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 能量圈
ctx.beginPath();
ctx.lineWidth = 7;
ctx.strokeStyle = "#73fd94";
moveTo(ctx, 497, 772);
bezierCurveTo(ctx, 425, 371, 1145, 80, 1262, 699);
bezierCurveTo(ctx, 1294, 945, 1105, 1031, 907, 1040);
bezierCurveTo(ctx, 716, 1049, 519, 962, 497, 772);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = "#f97dfe";
moveTo(ctx, 515, 794);
bezierCurveTo(ctx, 405, 421, 1093, 119, 1242, 646);
bezierCurveTo(ctx, 1316, 881, 1130, 1001, 898, 1003);
bezierCurveTo(ctx, 732, 1005, 562, 961, 515, 794);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 9;
ctx.strokeStyle = "#ecea87";
moveTo(ctx, 611, 909);
bezierCurveTo(ctx, 301, 602, 878, 185, 1137, 487);
bezierCurveTo(ctx, 1495, 981, 840, 1066, 611, 909);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 7;
ctx.strokeStyle = "#9ad6ff";
moveTo(ctx, 611, 909);
bezierCurveTo(ctx, 281, 592, 878, 200, 1137, 487);
bezierCurveTo(ctx, 1495, 1001, 840, 1076, 611, 909);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = "#9ad6ff";
moveTo(ctx, 515, 794);
bezierCurveTo(ctx, 405, 421, 1053, 109, 1242, 646);
bezierCurveTo(ctx, 1316, 911, 1150, 1001, 898, 1023);
bezierCurveTo(ctx, 732, 1025, 562, 971, 515, 794);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 7;
ctx.strokeStyle = "#d2fbe5";
moveTo(ctx, 545, 674);
bezierCurveTo(ctx, 673, 289, 1265, 370, 1215, 773);
bezierCurveTo(ctx, 1177, 1083, 453, 1010, 545, 674);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 7;
ctx.strokeStyle = "#4a46be";
moveTo(ctx, 549, 752);
bezierCurveTo(ctx, 548, 421, 1037, 320, 1191, 640);
bezierCurveTo(ctx, 1309, 1058, 597, 1021, 549, 752);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = "#b5e7fe";
moveTo(ctx, 549, 752);
bezierCurveTo(ctx, 548, 441, 1057, 300, 1191, 640);
bezierCurveTo(ctx, 1319, 1048, 567, 1021, 549, 752);
ctx.stroke();

// 嘴巴
ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = "#000000";
moveTo(ctx, 824, 728);
bezierCurveTo(ctx, 895, 754, 939, 740, 982, 726);
bezierCurveTo(ctx, 935, 782, 861, 764, 824, 728);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

ctx.beginPath();
moveTo(ctx, 870, 750);
bezierCurveTo(ctx, 876, 746, 939, 745, 945, 749);
bezierCurveTo(ctx, 910, 764, 872, 755, 870, 750);
ctx.fillStyle = "#e5482d";
ctx.fill();
ctx.stroke();
// 小红心
ctx.beginPath();
moveTo(ctx, 1364, 545);
bezierCurveTo(ctx, 1359, 525, 1300, 508, 1331, 595);
bezierCurveTo(ctx, 1338, 615, 1349, 607, 1356, 605);
bezierCurveTo(ctx, 1394, 587, 1420, 532, 1364, 545);
ctx.fillStyle = "red";
ctx.fill();
ctx.stroke();
// 左眼
ctx.beginPath();
moveTo(ctx, 749, 595);
bezierCurveTo(ctx, 798, 592, 829, 709, 743, 712);
bezierCurveTo(ctx, 659, 707, 686, 593, 749, 595);
ctx.fillStyle = "#ffffff";
ctx.fill();
ctx.stroke();

ctx.beginPath();
moveTo(ctx, 699, 655);
bezierCurveTo(ctx, 696, 596, 782, 574, 783, 653);
bezierCurveTo(ctx, 775, 735, 694, 699, 699, 655);
var l_eye = ctx.createRadialGradient(
  742 / SCALE,
  652 / SCALE,
  20 / SCALE,
  742 / SCALE,
  652 / SCALE,
  50 / SCALE
);
l_eye.addColorStop(0, "#857343");
l_eye.addColorStop(1, "black");
ctx.fillStyle = l_eye;
ctx.fill();
ctx.stroke();

ctx.beginPath();
moveTo(ctx, 719, 655);
bezierCurveTo(ctx, 716, 633, 760, 609, 762, 657);
bezierCurveTo(ctx, 755, 691, 723, 676, 719, 655);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 右眼
ctx.beginPath();
moveTo(ctx, 988, 630);
bezierCurveTo(ctx, 997, 569, 1091, 548, 1087, 647);
bezierCurveTo(ctx, 1079, 719, 976, 710, 988, 630);
ctx.fillStyle = "#ffffff";
ctx.fill();
ctx.stroke();

ctx.beginPath();
moveTo(ctx, 995, 634);
bezierCurveTo(ctx, 993, 584, 1077, 559, 1077, 641);
bezierCurveTo(ctx, 1068, 707, 993, 689, 995, 634);
var r_eye = ctx.createRadialGradient(
  1040 / SCALE,
  635 / SCALE,
  20 / SCALE,
  1040 / SCALE,
  635 / SCALE,
  50 / SCALE
);
r_eye.addColorStop(0, "#857343");
r_eye.addColorStop(1, "black");
ctx.fillStyle = r_eye;
ctx.fill();
ctx.stroke();

ctx.beginPath();
moveTo(ctx, 1022, 621);
bezierCurveTo(ctx, 1055, 596, 1065, 650, 1042, 659);
bezierCurveTo(ctx, 1027, 662, 1002, 646, 1022, 621);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

// 左眼高光
ctx.strokeStyle = "#ffffff";
ctx.beginPath();
ctx.arc(743 / SCALE, 623 / SCALE, 13 / SCALE, 0, 2 * Math.PI);
ctx.fillStyle = "#ffffff";
ctx.fill();
ctx.stroke();
ctx.strokeStyle = "#000000";

ctx.strokeStyle = "#5fc2ba";
ctx.beginPath();
ctx.arc(732 / SCALE, 675 / SCALE, 7 / SCALE, 0, 2 * Math.PI);
ctx.fillStyle = "#5fc2ba";
ctx.fill();
ctx.stroke();
ctx.strokeStyle = "#000000";

// 右眼高光
ctx.strokeStyle = "#ffffff";
ctx.beginPath();
ctx.arc(1036 / SCALE, 606 / SCALE, 12 / SCALE, 0, 2 * Math.PI);
ctx.fillStyle = "#ffffff";
ctx.fill();
ctx.stroke();
ctx.strokeStyle = "#000000";

ctx.strokeStyle = "#5fc2ba";
ctx.beginPath();
ctx.arc(1024 / SCALE, 659 / SCALE, 7 / SCALE, 0, 2 * Math.PI);
ctx.fillStyle = "#5fc2ba";
ctx.fill();
ctx.stroke();
ctx.strokeStyle = "#000000";

// 鼻子
ctx.beginPath();
moveTo(ctx, 914, 646);
bezierCurveTo(ctx, 863, 646, 867, 682, 901, 698);
bezierCurveTo(ctx, 920, 706, 927, 704, 941, 694);
bezierCurveTo(ctx, 970, 668, 961, 644, 914, 646);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.stroke();

ctx.beginPath();
moveTo(ctx, 886, 666);
bezierCurveTo(ctx, 887, 648, 945, 644, 944, 666);
bezierCurveTo(ctx, 944, 686, 886, 683, 886, 666);
var nose = ctx.createLinearGradient(910, 650, 910, 675);
nose.addColorStop(1, "black");
nose.addColorStop(0, "white");
ctx.fillStyle = nose;
ctx.fill();
ctx.stroke();
// 五环
ctx.lineWidth = 3;
ctx.strokeStyle = "#ebcb44";
ctx.beginPath();
ctx.arc(886 / SCALE, 1245 / SCALE, 15 / SCALE, 0, 2 * Math.PI);
ctx.stroke();

ctx.lineWidth = 3;
ctx.strokeStyle = "#2bb459";
ctx.beginPath();
ctx.arc(921 / SCALE, 1245 / SCALE, 15 / SCALE, 0, 2 * Math.PI);
ctx.stroke();

ctx.lineWidth = 3;
ctx.strokeStyle = "#5398db";
ctx.beginPath();
ctx.arc(871 / SCALE, 1230 / SCALE, 15 / SCALE, 0, 2 * Math.PI);
ctx.stroke();

ctx.lineWidth = 3;
ctx.strokeStyle = "#2c2e2e";
ctx.beginPath();
ctx.arc(906 / SCALE, 1230 / SCALE, 15 / SCALE, 0, 2 * Math.PI);
ctx.stroke();

ctx.lineWidth = 3;
ctx.strokeStyle = "#f53e59";
ctx.beginPath();
ctx.arc(941 / SCALE, 1230 / SCALE, 15 / SCALE, 0, 2 * Math.PI);
ctx.stroke();
