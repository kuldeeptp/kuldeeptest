var nse = require('./common/nse');
var greeks = require("greeks");
var bs = require("black-scholes");
var DateDiff = require('date-diff');


nse.getOptionChain('NIFTY','OPTIDX','27APR2017',test);
//nse.getStockVolatility();
//console.log("DATA : ",mydata);

function test(data){
    console.log("DATA*** : ",data);
}



function numDays(expDate){
        var today = new Date();
        var curDate = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
        expDate=expDate.split('-');
        var date2 = new Date(expDate[0], expDate[1], expDate[2]);
        var diff = new DateDiff(date2,curDate);
        //console.log('Diff: ',diff.days());
        return diff.days()/365;
}

 function expiryToNormal(expiry){
        var b = expiry.split('');
        var month =[];
        month['JAN']='01';
        month['FEB']='02';
        month['MAR']='03';
        month['APR']='04';
        month['MAY']='05';
        month['JUN']='06';
        month['JUL']='07';
        month['AUG']='08';
        month['SEP']='09';
        month['OCT']='10';
        month['NOV']='11';
        month['DEC']='12';

        return b[5]+''+b[6]+''+b[7]+''+b[8]+'-'+month[b[2]+''+b[3]+''+b[4]]+'-'+b[0]+''+b[1];
    }
//  var expiry = '27APR2017';
// Delta = parseFloat( greeks.getDelta(447, 450, numDays(expiryToNormal(expiry)), 0.3243, .1, 'call')).toFixed(4);
// Gamma = parseFloat( greeks.getGamma(447, 450, numDays(expiryToNormal(expiry)), 0.3243, .1, 'call')).toFixed(4);
// Vega = parseFloat( greeks.getVega(447, 450, numDays(expiryToNormal(expiry)), 0.3243, .1, 'call')).toFixed(4);
// Theta = parseFloat( greeks.getTheta(447, 450, numDays(expiryToNormal(expiry)), 0.3243, .1, 'call')).toFixed(4);
// Rho = parseFloat( greeks.getRho(447, 450, numDays(expiryToNormal(expiry)), 0.3243, .1, 'call')).toFixed(4);

//  console.log('Delta,Theta,Vega : ',Delta,Theta,Vega);

// Delta = parseFloat( greeks.getDelta(447, 450, numDays(expiryToNormal(expiry)), 0.2897, .1, 'put')).toFixed(4);
// Vega = parseFloat( greeks.getVega(447, 450, numDays(expiryToNormal(expiry)), 0.2897, .1, 'put')).toFixed(4);
// Theta = parseFloat( greeks.getTheta(447, 450, numDays(expiryToNormal(expiry)), 0.2897, .1, 'put')).toFixed(4);
// console.log('Delta,Theta,Vega : ',Delta,Theta,Vega);


// Delta = parseFloat( greeks.getDelta(284.25, 285, numDays(expiryToNormal(expiry)), 0.3418, .1, 'call')).toFixed(4);
// Vega = parseFloat( greeks.getVega(284.25, 285, numDays(expiryToNormal(expiry)), 0.3418, .1, 'call')).toFixed(4);
// Theta = parseFloat( greeks.getTheta(284.25, 285, numDays(expiryToNormal(expiry)), 0.3418, .1, 'call')).toFixed(4);
// console.log('Delta,Theta,Vega : ',Delta,Theta,Vega);

// Delta = parseFloat( greeks.getDelta(284.25, 285, numDays(expiryToNormal(expiry)), 0.2776, .1, 'put')).toFixed(4);
// Vega = parseFloat( greeks.getVega(284.25, 285, numDays(expiryToNormal(expiry)), 0.2776, .1, 'put')).toFixed(4);
// Theta = parseFloat( greeks.getTheta(284.25, 285, numDays(expiryToNormal(expiry)), 0.2776, .1, 'put')).toFixed(4);
// console.log('Delta,Theta,Vega : ',Delta,Theta,Vega);


// Delta = parseFloat( greeks.getDelta(284.25, 290, numDays(expiryToNormal(expiry)), 0.3271, .1, 'call')).toFixed(4);
// Vega = parseFloat( greeks.getVega(284.25, 290, numDays(expiryToNormal(expiry)), 0.3271, .1, 'call')).toFixed(4);
// Theta = parseFloat( greeks.getTheta(284.25, 290, numDays(expiryToNormal(expiry)), 0.3271, .1, 'call')).toFixed(4);
// console.log('Delta,Theta,Vega : ',Delta,Theta,Vega);

// Delta = parseFloat( greeks.getDelta(284.25, 270, numDays(expiryToNormal(expiry)), 0.3353, .1, 'put')).toFixed(4);
// Vega = parseFloat( greeks.getVega(284.25, 270, numDays(expiryToNormal(expiry)), 0.3353, .1, 'put')).toFixed(4);
// Theta = parseFloat( greeks.getTheta(284.25, 270, numDays(expiryToNormal(expiry)), 0.3353, .1, 'put')).toFixed(4);
// console.log('Delta,Theta,Vega : ',Delta,Theta,Vega);


// var no = numDays(expiryToNormal(expiry));

//console.log('numdays ',numDays(expiryToNormal(expiry)));




//mongoimport -d zerodha -c code  --type csv  --headerline --file 