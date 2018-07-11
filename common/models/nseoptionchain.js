/**
 * Created by kuldeep on 11/01/17.
 */
var greeks = require("greeks");
var bs = require("black-scholes");
var async = require('async');
var DateDiff = require('date-diff');
var NSE = require(process.cwd()+'/common/nse');

module.exports = function(NSEOptionChain) {
    /***
     *
     * @param custom
     * @param callback
     */
    function getOptionData(data){
        return data;

    }

    NSEOptionChain.getOptionDataChain = function(Code,Expiry,callback){
        var Script = app.models.code;
        var expiry = Expiry;//'27APR2017';
        if(expiry.length == 9){
            console.log('Expiry : ',Expiry);
            var chain = {};
            Script.find({where:{Code:Code}}, function(err,stock) {
                if(err){
                    console.log('Error in getting Volatility from database :',err);
                }else{
                    console.log('Script arrived : ',stock[0].Type);
                    chain.details = stock[0];
                    NSE.getOptionChain(Code,stock[0].Type,expiry,function(err,data){
                        //console.log('data : ',data);
                        console.log('err : ',err);
                        var no = numDays(expiryToNormal(expiry));
                        console.log('expiryToNormal : ',expiryToNormal(expiry));
                        console.log('numDays : ',no);
                        async.each(data.option,function(opt,err){
                            var type = opt.type == "CE"?'call':'put';
                            var IV = opt['IV']=='-'?0:opt['IV']/100;
                            opt.Delta = parseFloat( greeks.getDelta(data.underLying, opt['StrikePrice'], numDays(expiryToNormal(expiry)), IV, .1, type)).toFixed(4);
                            opt.Gamma = parseFloat( greeks.getGamma(data.underLying, opt['StrikePrice'], numDays(expiryToNormal(expiry)), IV, .1, type)).toFixed(4);
                            opt.Vega = parseFloat( greeks.getVega(data.underLying, opt['StrikePrice'], numDays(expiryToNormal(expiry)), IV, .1, type)).toFixed(4);
                            opt.Theta = parseFloat( greeks.getTheta(data.underLying, opt['StrikePrice'], numDays(expiryToNormal(expiry)), IV, .1, type)).toFixed(4);
                            opt.Rho = parseFloat( greeks.getRho(data.underLying, opt['StrikePrice'], numDays(expiryToNormal(expiry)), IV, .1, type)).toFixed(4);
                            //opt.IV1 = parseFloat( getImpliedVolatility(opt.last_price,data.underLying, opt['Strike Price'], numDays(expiryToNormal(expiry)), .1, type)).toFixed(4);
                            opt.CPrice = parseFloat( bs.blackScholes(data.underLying, opt['StrikePrice'], numDays(expiryToNormal(expiry)), IV, .1, type)).toFixed(4);
                                        //console.log('Delta : ',opt.delta);
                        });
                        return callback(null,data);

                    });

                }
            });
        }else{
            return callback(null,{});
        }
        
        
    }




    function numDays(expDate){
        var today = new Date();
        var curDate = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
        expDate=expDate.split('-');
        var date2 = new Date(expDate[0], expDate[1], expDate[2]);
        var diff = new DateDiff(date2,curDate);
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

    /**
     * Calculate a close estimate of implied volatility given an option price.  A
     * binary search type approach is used to determine the implied volatility.
     *
     * @param {Number} expectedCost The market price of the option
     * @param {Number} s Current price of the underlying
     * @param {Number} k Strike price
     * @param {Number} t Time to experiation in years
     * @param {Number} r Anual risk-free interest rate as a decimal
     * @param {String} callPut The type of option priced - "call" or "put"
     * @param {Number} [estimate=.1] An initial estimate of implied volatility
     * @returns {Number} The implied volatility estimate
     */
    function getImpliedVolatility(expectedCost, s, k, t, r, callPut, estimate)
    {
        estimate = estimate || .1;
        var low = 0;
        var high = Infinity;
        // perform 100 iterations max
        for(var i = 0; i < 100; i++)
        {
            var actualCost = bs.blackScholes(s, k, t, estimate, r, callPut);
            // compare the price down to the cent
            if(expectedCost * 100 == Math.floor(actualCost * 100))
            {
                break;
            }
            else if(actualCost > expectedCost)
            {
                high = estimate;
                estimate = (estimate - low) / 2 + low
            }
            else
            {
                low = estimate;
                estimate = (high - estimate) / 2 + estimate;
                if(!isFinite(estimate)) estimate = low * 2;
            }
        }
        return estimate;
    }

    /***
     * Exposing to REST API
     */
    NSEOptionChain.remoteMethod('getOptionDataChain',
        {
            description: 'Return  Option Chain.',
            accepts: [
                {arg: 'Code', type: 'string', required: true},
                {arg: 'Expiry', type: 'string', required: false}
            ],
            http: {verb: 'get', path: '/getOptionChain'},
            returns: {arg: 'data', type: 'object'}
        });
}