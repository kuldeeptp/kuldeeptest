/**
 * Created by kuldeep on 10/01/17.
 */

var request = require('request');
var str2json = require('string-to-json');

function getStockVolatility(){
    var serviceURL = "http://finance.yahoo.com/d/quotes.csv?f=nspol1d1dy&s=MO+AXP+AMGN+AAPL+T+BAC+BA+BMY+CAT+CVX+CSCO+KO+YUM";
    var options = {

        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Host': 'finance.yahoo.com',
            'Referer': 'http://finance.yahoo.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }


    request(serviceURL, options,function(error, response, body) {
        if(error){
            console.log('Error : ',error)
        }else {
            body = "name,symbol,previous,open,lasttraded,ltd,dividend,yield \n"+body;
            const csv=require('csvtojson');
            csv()
            .fromString(body)
            .on('json',(json)=>{ //this func will be called 3 times 
                // json.field1 => 1,4,7 
                // json.field2 => 2,5,8 
                // json.field3 => 3,6,9 
                console.log(json);
               
            })
            .on('done',()=>{
                
                console.log('end')
            })
            //console.log(body);
            // body = body.replace('Current Day Underlying Daily Volatility (E) = Sqrt(0.94*D*D + 0.06*C*C)', 'DailyVolatility')
            //     .replace('Underlying Annualised Volatility (F) = E*Sqrt(365)', 'AnnualisedVolatility')
            //     .replace('Previous Day Underlying Volatility (D)', 'PDVolatility')
            //     .replace('Underlying Log Returns (C) = LN(A/B)', 'LogReturn')
            //     .replace('Underlying Close Price (A)','Close')
            
        }

    })
}

getStockVolatility();