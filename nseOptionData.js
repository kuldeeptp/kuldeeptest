/**
 * Created by kuldeep on 10/01/17.
 */

var fs = require("fs");
var request = require('request');
var tabletojson = require('tabletojson');
var spawn = require('child_process').spawn;

function getNSEOptionChain(code = 'ITC',instrument='OPTSTK'){
    var serviceURL = "https://www.nseindia.com/live_market/dynaContent/live_watch/option_chain/optionKeys.jsp?symbol="+code+"&instrument="+instrument;
    var options = {

        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Host': 'nseindia.com',
            'Referer': 'http://nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol='+code+'&illiquid=0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }


    request(serviceURL, options,function(error, response, body) {
        if(error){
            console.log('Error : ',error)
        }else {

            var tablesAsJson = tabletojson.convert(body);
            console.log(tablesAsJson);

            // body = body.replace('Current Day Underlying Daily Volatility (E) = Sqrt(0.94*D*D + 0.06*C*C)', 'DailyVolatility')
            //     .replace('Underlying Annualised Volatility (F) = E*Sqrt(365)', 'AnnualisedVolatility')
            //     .replace('Previous Day Underlying Volatility (D)', 'PDVolatility')
            //     .replace('Underlying Log Returns (C) = LN(A/B)', 'LogReturn')
            //     .replace('Underlying Close Price (A)','Close')
            //     .replace('Underlying Previous Day Close Price (B)','PDClose');
            // fs.writeFile(process.cwd()+'/data/option/Volatility.csv',body,function(err){
            //     if(err) {
            //         return console.log(err);
            //     }
            //
            //     console.log("The file was saved!")
            //     mongoImport('volatility',"/data/option/Volatility.csv");
            //
            // })
        }

    })
}


function getOptiondata(){
    var serviceURL = "https://api.kite.trade/instruments/NFO?api_key=6m5t0f42wf6a86es";

    request(serviceURL, function(error, response, body) {
        if(error){
            console.log('Error : ',error)
        }
        fs.writeFile(process.cwd()+'/data/option/NFO.csv',body,function(err){
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!")
            mongoImport('option',"/data/option/NFO.csv");

        })

    });
}
var mongoImport = function(ns,file){

    var ns = ns == '' ? 'option' : ns;
    var fileName = file == '' ? "/data/option/NFO.csv" : file;

    var res  = spawn('mongoimport', ["-d", "zerodha", "-c", ns, "--type", "csv", "--headerline", "--file", process.cwd()+ fileName]);

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
}
//getOptiondata();
getStockVolatility();
//mongoImport(); 
//getNSEOptionChain();