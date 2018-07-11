/**
 * Created by tekmint on 21/08/16.
 */
/**
 * Created by kuldeep on 11/07/16.
 */

module.exports = function(app) {

    var async = require('async');
    var KiteTicker = require("kiteconnect").KiteTicker;

    var Zstreaming = app.models.zstreaming;

    var Gannstrategy = app.models.gannstrategy;
    var Ganntradelogs = app.models.ganntradelogs;
    var Gapstrategy = app.models.gapstrategy;
    var Gannrangetradelogs = app.models.gannrangetradelogs;

    //Gannstrategy.initStrategy();
    //Ganntradelogs.initTade();
    //Gannrangetradelogs.initTrade();

    var api_key = '6m5t0f42wf6a86es';
    var user_id = 'RD1567';
    var public_token ='7wlwc7f7mytbqtn3hfjx9890nlvutved';

    var ticker = new KiteTicker(api_key,user_id,public_token);
    
    ticker.connect();
    ticker.on("tick", setTick);
    ticker.on("connect", subscribe);
    ticker.on("disconnect", function(){
        console.log("Streaming disconnected... Reconnecting again ......");
        ticker.connect();
    });


    async.series([
        Gannstrategy.initStrategy(),
        Gannrangetradelogs.initTrade(),
        function(){
            var ticker = new KiteTicker(api_key,user_id,public_token);

            ticker.connect();
            ticker.on("tick", setTick);
            ticker.on("connect", subscribe);
            ticker.on("disconnect", function(){
                console.log("Streaming disconnected... Reconnecting again ......");
                ticker.connect();
            });
        }],
        function(){
            console.log('**** Initialialization is completed  : ');
        }
    );


    function setTick(ticks){
        ticks.forEach(function (tick) {
            //console.log("Tick ", tick);

            //Zstreaming.add(tick);
            trades(tick)
            //console.log("============================================");
        });
    }

    function subscribe() {
        var items = [256265,424961,424961,737793,141569,738561,2939649,779521,177665,511233,2730497,2977281,2905857,341249,2953217,2714625,3677697,408065,2883073,359169,320001,121345,6401,41729,1510401,112129,134657,2763265,3771393,3789569,348929,3699201,1723649,2933761,884737,2752769,3050241,5215745,3001089,2672641,3001089,1346049,356865,359937,345089,340481,1850625,225537,4267265,70401,3513601,3663105,1214721,1076225,895745,2873089,2079745,81153,94977,60417,98049,101121,108033,4995329,49409,160001,160769,215553,1207553,2513665,2815745,25601,401153,5633];
        ticker.subscribe(items);
        //ticker.setMode(ticker.modeFull, items);
        ticker.setMode(ticker.modeQuote, items);
    }
    
    function trades(tick) {
        //console.log("Gannstrategies : ",gannStrategies);
        //Ganntradelogs.trade(tick,Gannstrategy);
        Gapstrategy.trade(tick);
        //Gannrangetradelogs.trade(tick,Gannstrategy);
    }
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