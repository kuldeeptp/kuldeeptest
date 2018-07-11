'use strict';

module.exports = function (Gapstrategy) {
    var time = require('time');
    var async = require('async');
    

    if(!client){
        var redis = require('redis');
        var client = redis.createClient();
    }

/*


 Tick  { mode: 'quote',
 tradeable: true,
 Token: 1723649,
 LastTradedPrice: 70.85,
 LastTradeQuantity: 100,
 AverageTradePrice: 69.97,
 VolumeTradedToday: 10327985,
 TotalBuyQuantity: 958225,
 TotalSellQuantity: 671804,
 OpenPrice: 66.3,
 HighPrice: 72.15,
 LowPrice: 66.1,
 ClosePrice: 66.65,
 Depth: { buy: [], sell: [] },
 NetPriceChangeFromClosingPrice: 6.301575393848444 }

 */
    Gapstrategy.trade = function(tick){
        
        var token = 'GAP-'+tick.Token;
        let threshHold = 0.5;
       
        client.get(token, function(error, data) {
            if(data){
     
            }else{
                let diff = tick.OpenPrice - tick.ClosePrice;
                let diffpercent = 100*diff/tick.ClosePrice;
                let msg ={};
                msg.tick = tick;
                msg.gap = diffpercent;
                msg.msg = 'GAPUP';
                if(diffpercent >=threshHold){                   
                    client.set(token,JSON.stringify(msg));
                    client.publish('GapAlert',JSON.stringify(msg));

                }else if(diffpercent <= threshHold*-1){
                    msg.msg = 'GAPDOWN';
                    client.set(token,JSON.stringify(msg));
                    client.publish('GapAlert',JSON.stringify(msg));
                }
            }
        });
    }

};
