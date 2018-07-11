/**
 * Created by kuldeep on 5/10/16.
 */
var time = require('time');
var loopback = require('loopback');
var boot = require('loopback-boot');
var redis = require('redis');
//var io = require('socket.io');
app = module.exports = loopback();


var fs = require("fs");
var Ganntradelogs = app.models.ganntradelogs;
//
// fs = require('fs')
// fs.readFile('/home/kuldeep/tradelog2.json', 'utf8', function (err,data) {
//     if (err) {
//         return console.log(err);
//     }
//     var aa = JSON.parse(data);
//
//
//     fs.appendFile('/home/kuldeep/tradelog2.csv', 'Code,Price,StopLoss,TargetProfit,ExitPrice, EntryTime,Active,Res,TradeType,ExitTime' + '\n', 'utf8', function (data) {});
//     aa.forEach(function(row){
//         if(row.ExitPrice !=0){
//             console.log(row.ExitPrice);
//             fs.appendFile('/home/kuldeep/tradelog2.csv', row.Code +','+row.Price+','+row.StopLoss+','+row.TargetProfit+','+row.ExitPrice+','+ row.EntryTime+','+row.Active+','+row.Res+','+row.TradeType+','+row.ExitTime + '\n', 'utf8', function (data) {});
//         }
//
//     });
// });



function getIndianDate(){
    time.tzset("Asia/Calcutta");
    myDate = time.Date();
    var startDate = new Date();
    return  startDate.toJSON().slice(0, 10)+' '+myDate.toString().slice(16, 24);
}

function getIndianTime(){
    time.tzset("Asia/Calcutta");
    myDate = time.Date();
    return myDate.toString().slice(16, 24);
}


console.log("getIndianDate : ",getIndianDate());
console.log("getIndianTime : ",getIndianTime());