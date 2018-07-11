/**
 * Created by kuldeep on 11/07/16.
 */

'use strict';



    var fs = require("fs");
    var request = require('request');
    var async = require('async');
    var spawn = require('child_process').spawn;
    var symbols = [{Code:'INFY',Token:408065}]

    

    function task() {
        console.log("Running : ", Date());
            console.log("instruments : ", symbols);
            //minutes(symbols);
            //minutes30(symbols);
            //minutes3(symbols);
            //minutes5(symbols);
            daily(symbols);
            //async.series([ minutes3(symbols),
            //    minutes30(symbols),
            //    daily(symbols)],function(err,res){
            //    if(err){
            //        console.log('Error Result : ',err);
            //
            //    }else{
            //        console.log('All Task completed ');
            //    }
            //
            //})

  

    }


    function minutes(symbols) {
       
        fetchZerodha(symbols, 'minute');
    }

    function minutes3(symbols) {
        fetchZerodha(symbols, '3minute');
    }

    function minutes5(symbols) {
        fetchZerodha(symbols, '5minute');
    }

    function minutes30(symbols) {
        fetchZerodha(symbols, '30minute');
    }

    function daily(symbols) {
        fetchZerodha(symbols, 'day');
    }

// duration can be day ,3minute, 30minute
    function fetchZerodha(symbols, duration) {
        duration = typeof duration !== 'undefined' ? duration : 'day';

        var tasks = [];
        var endDate = new Date();
        var startDate = new Date();

        //startDate.setFullYear(startDate.getFullYear() -1);

        if (duration == 'minute') {
            startDate.setDate(startDate.getDate() - 1);
        } else if (duration == '3minute') {
            startDate.setDate(startDate.getDate() - 89);
        } else if (duration == '5minute') {
            startDate.setDate(startDate.getDate() - 1);
        } else if (duration == '30minute') {
            startDate.setDate(startDate.getDate() - 180);
        } else {
            startDate.setFullYear(startDate.getFullYear() - 1);
            startDate.setMonth(1);
        }

        startDate = startDate.toJSON().slice(0, 10);
        endDate = endDate.toJSON().slice(0, 10);

        symbols.forEach(function (symbol) {

            tasks.push(function (callback) {

                var serviceURL = "https://api.kite.trade/instruments/historical/" + symbol.Token + "/" + duration + "?from=" + startDate + "&to=" + endDate + "&api_key=6m5t0f42wf6a86es&access_token=65gld970pu90o92l8k0gs5m1p2fka3wd";

                request(serviceURL, function (error, response, body) {
                    if (error) {
                        console.log('Error : ', error)
                    }
                    body = JSON.parse(body);
                    if (body.status == 'success') {
                        fs.unlink(process.cwd() + '/data/' + duration + '/' + symbol.Code + '.csv', function (err) {
                            //if(err) return console.log(err);
                            console.log('Deleted successfully : ', process.cwd() + '/data/' + duration + '/' + symbol.Code + '.csv');
                            fs.appendFile(process.cwd() + '/data/' + duration + '/' + symbol.Code + '.csv', 'Date,Open,High,Low,Close,Volume' + '\n', 'utf8', function (data) {
                                body.data.candles.forEach(function (candle) {
                                    fs.appendFile(process.cwd() + '/data/' + duration + '/' + symbol.Code + '.csv',  candle.join(', ').replace('T', ' ').replace('+0530', '') + '\n', 'utf8', function (data) {
                                    });
                                });
                                console.log(" Downloaded : ", symbol.Code, symbol.Token);
                                callback(null, symbol);
                            });
                        });

                    } else {
                        callback(body, symbol);
                    }
                });

            });
        });

        async.series(tasks, function (err, res) {
            if (err) {
                console.log('Error Result : ', err);

            } else {
                console.log('All Task completed ');
            }

        })
    }



    function runMinute() {
        console.log("Running : ", Date())
    }

    task();
    //setInterval(task, 18000)
