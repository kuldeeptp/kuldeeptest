/**
 * Created by kuldeep on 11/01/17.
 */
var greeks = require("greeks");
var bs = require("black-scholes");
var async = require('async');
var DateDiff = require('date-diff');

module.exports = function(OptionChanin) {
    /***
     *
     * @param custom
     * @param callback
     */


    OptionChanin.getOptionChain = function(Code,callback){
        var Volatility = app.models.volatility;
        var Option = app.models.option;
        var chain = {};
        Volatility.find({where:{Symbol:Code}}, function(err,stock) {
            if(err){
                console.log('Error in getting Volatility from database :',err);
            }else{
                //console.log('Volatility arrived : ',stock[0]);
                chain.details = stock[0];
                Option.find({where:{tradingsymbol:{like: Code+'.'}},order:['expiry ASC' ,'tradingsymbol ASC']}, function(err,data) {
                    if(err){
                        console.log('Error in getting Volatility from database :',err);
                        return callback(null,chain);
                    }else{
                        // console.log('Volatility arrived : ',data);
                        async.each(data,function(opt,err){
                            var type = opt.instrument_type == "CE"?'call':'put';
                            opt.Delta = parseFloat( greeks.getDelta(stock[0].Close, opt.strike, numDays(opt.expiry), stock[0].AnnualisedVolatility, .1, type)).toFixed(4);
                            opt.Gamma = parseFloat( greeks.getGamma(stock[0].Close, opt.strike, numDays(opt.expiry), stock[0].AnnualisedVolatility, .1, type)).toFixed(4);
                            opt.Vega = parseFloat( greeks.getVega(stock[0].Close, opt.strike, numDays(opt.expiry), stock[0].AnnualisedVolatility, .1, type)).toFixed(4);
                            opt.Theta = parseFloat( greeks.getTheta(stock[0].Close, opt.strike, numDays(opt.expiry), stock[0].AnnualisedVolatility, .1, type)).toFixed(4);
                            opt.Rho = parseFloat( greeks.getRho(stock[0].Close, opt.strike, numDays(opt.expiry), stock[0].AnnualisedVolatility, .1, type)).toFixed(4);
                            opt.IV = parseFloat( getImpliedVolatility(opt.last_price,stock[0].Close, opt.strike, numDays(opt.expiry), .1, type)).toFixed(4);
                            opt.CPrice = parseFloat( bs.blackScholes(stock[0].Close, opt.strike, numDays(opt.expiry), stock[0].AnnualisedVolatility, .1, type)).toFixed(4);
                            //console.log('Delta : ',opt.delta);
                        });
                        chain.option = data;
                        return callback(null,chain);
                    }
                });
            }
        });
    }


    function numDays(expDate){
        var today = new Date();
        var curDate = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
        expDate=expDate.split('-');
        var date2 = new Date(expDate[0], expDate[1], expDate[2]);
        var diff = new DateDiff(date2,curDate);
        return diff.days()/365;

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
    OptionChanin.remoteMethod('getOptionChain',
        {
            description: 'Return  Option Chain.',
            accepts: [
                {arg: 'Code', type: 'string', required: true}
            ],
            http: {verb: 'get', path: '/getOptionChain'},
            returns: {arg: 'data', type: 'object'}
        });
}