/**
 * Created by tekmint on 21/08/16.
 */
var greeks = require("greeks");
var bs = require("black-scholes");
var async = require('async');
var DateDiff = require('date-diff');
var request = require('request');

var tableToJSON = require('tabletojson');
var fs = require("fs");
var spawn = require('child_process').spawn;

var NSE = module.exports = function(nse) {

};
NSE.getOptionChain = function (code="ITC", instrument='OPTSTK',expiry='27APR2017',callback){
    var serviceURL = "https://www.nseindia.com/live_market/dynaContent/live_watch/option_chain/optionKeys.jsp?symbol="+code+"&instrument="+instrument+"&date="+expiry;
    if(instrument == 'OPTCUR')
        serviceURL = "https://nseindia.com/live_market/dynaContent/live_watch/fxTracker/optChainDataByExpDates.jsp?symbol="+code+"&instrument="+instrument+"&expiryDt="+expiry;
        //serviceURL = "https://www.nseindia.com/live_market/dynaContent/live_watch/fxTracker/optChainDataByExpDates.jsp?symbol="+code+"&instrument="+instrument+"&expiryDt="+expiry;
        // https://nseindia.com/live_market/dynaContent/live_watch/fxTracker/optChainDataByExpDates.jsp?symbol=USDINR&instrument=OPTCUR&expiryDt=29MAY2017
        // https://nseindia.com/live_market/dynaContent/live_watch/fxTracker/optChainDataByExpDates.jsp?symbol=USDINR&instrument=OPTCUR&expiryDt=27APR2017

    console.log(" instrument : ",instrument," url :",serviceURL);

    var options = {

        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Host': 'nseindia.com',
            'Referer': 'http://nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol='+code+'&illiquid=0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    request(serviceURL, options,function(error, response, body) {
        if(error){
            console.log('Error : ',error)
            return callback(null,error);
        }else {
            var tablesAsJson = tableToJSON.customConvert(body);
            console.log('tablesAsJson1 : ',tablesAsJson);
            if(tablesAsJson[2][0]=='Top'){
                return callback(null,{});

            }else{
                var a = getUnderLine(tablesAsJson[0]);
            
                var data = {underLying:'',option:[]};
                data.underLying = getUnderLine(tablesAsJson[0]);
                data.option=tablesAsJson[2];
                console.log('tablesAsJson : ',data);
                return callback(null,data);
            }
            
        }
    });
};

function getUnderLine(a){
    var b = a[0];
    var c = b['1']
    console.log("tablesAsJson : ",c);
    var d= c.split('\r\n');
    var e = d[0].split(':');
    var f = e[1].split(' ');
    var g = f[2].split('\n');
    console.log('Final value : ',g[0].trim());

    //console.log('Final value : ',f[2].trim(),'  F: ',f);
    return g[0].trim();

}

NSE.getStockVolatility = function(){
    var serviceURL = "https://www.nseindia.com/archives/nsccl/volt/CMVOLT_"+NSE.previousWorkingDate()+".CSV";
    console.log("serviceURL : ",serviceURL);
    var options = {

        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Host': 'nseindia.com',
            'Referer': 'http://nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol=INFY&illiquid=0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }


    request(serviceURL, options,function(error, response, body) {
        if(error){
            console.log('Error : ',error)
        }else {
            //console.log(body);
            body = body.replace('Current Day Underlying Daily Volatility (E) = Sqrt(0.94*D*D + 0.06*C*C)', 'DailyVolatility')
                .replace('Underlying Annualised Volatility (F) = E*Sqrt(365)', 'AnnualisedVolatility')
                .replace('Previous Day Underlying Volatility (D)', 'PDVolatility')
                .replace('Underlying Log Returns (C) = LN(A/B)', 'LogReturn')
                .replace('Underlying Close Price (A)','Close')
                .replace('Underlying Previous Day Close Price (B)','PDClose');
            fs.writeFile(process.cwd()+'/data/option/Volatility.csv',body,function(err){
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!")
                NSE.mongoImport('volatility',"/data/option/Volatility.csv");

            })
        }

    })
};

NSE.mongoImport = function(ns,file,drop){

    var ns = ns == '' ? 'option' : ns;
    var fileName = file == '' ? "/data/option/NFO.csv" : file;

    if(drop){
        var res  = spawn('mongoimport', ["-d", "zerodha", "-c", ns, "--drop", "--type","csv", "--headerline", "--file", process.cwd()+ fileName]);
    }else{
        var res  = spawn('mongoimport', ["-d", "zerodha", "-c", ns, "--type","csv", "--headerline", "--file", process.cwd()+ fileName]);
    }


    res.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
        //runStrategy(code,ns);
    });

    res.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    res.on('exit', function (code) {
        //console.log('child process exited with code ' + code);
    });
};

NSE.previousWorkingDate = function(){
    var day;
    var month = [];
    month[0]='01';
    month[1]='02';
    month[2]='03';
    month[3]='04';
    month[4]='05';
    month[5]='06';
    month[6]='07';
    month[7]='08';
    month[8]='09';
    month[9]='10';
    month[10]='11';
    month[11]='12';
    var dt= new Date();

    if(6==dt.getDay()){
        dt.setDate(dt.getDate() - 1);

    }else if(0==dt.getDay()){
        dt.setDate(dt.getDate() - 2);

    }else if(1==dt.getDay()){
        dt.setDate(dt.getDate() - 3);
    }else{
        dt.setDate(dt.getDate() - 1);
    }
    // if(dt.getDate() < 10){
    //      day = '0'+dt.getDate()
    // }
    day = dt.getDate() < 10 ?'0'+dt.getDate():dt.getDate();
    return day+month[dt.getMonth()]+dt.getFullYear();

}

NSE.testme =  function () {
    console.log("NSE Obeject testme");
}