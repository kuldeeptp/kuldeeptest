'use strict';

module.exports = function (Gannstrategy) {

    if(client === undefined ){
        var redis = require('redis');
        var client = redis.createClient();
    }

    Gannstrategy.initStrategy = function(){

        Gannstrategy.find({}, function(err,data) {
            if(err){
                console.log('Error in getting Gann data from database :',err);
            }else{
                console.log('data arrived : ');
                initGannRedis(data);
            }

        });
    }


    function initGannRedis(data){
        console.log('Starting initialization of GannRedis');
        data.forEach(function (instrument) {
            // 0=Buy, 7=BuyStop, 8=Short, 15=Short Stop

            instrument.values=[instrument.Buy,instrument.TP1,instrument.TP2,instrument.TP3,instrument.TP4,instrument.TP5,instrument.TP6,instrument.Bstp,instrument.Short,instrument.STP1,instrument.STP2,instrument.STP3,instrument.STP4,instrument.STP5,instrument.STP6,instrument.Sstp];
            client.set('GST-'+instrument.InstrumentToken ,JSON.stringify(instrument));
        });

        //For testing
        //gsTest();
    }

    //Update Gann Strategy
    Gannstrategy.updateGS = function(gs,strategy){
        var ltd = new Date();
         ltd.setMinutes(ltd.getMinutes()+10);
        console.log('LDT : ',ltd);
        var ltd = ltd.toJSON().slice(0, 19);

        if(strategy==1){
            gs.lastTraded=ltd;
            client.set('GST-'+gs.InstrumentToken ,JSON.stringify(gs));
            console.log('*** 1 Gan update : ',gs);
            return Gannstrategy.update({Code:gs.Code, date:gs.date},{
                lastTraded: ltd,
                TradeCount: gs.TradeCount
            }, function(err, data) {});

        }else if(strategy==2){
            gs.rangeLastTraded=ltd;

            client.set('GST-'+gs.InstrumentToken ,JSON.stringify(gs));
            console.log('**** 2 Gan update : ',gs);
            return Gannstrategy.update({Code:gs.Code, date:gs.date},{
                rangeLastTraded: ltd,
                t1: gs.t1,
                t2: gs.t2,
                TradeCount: gs.TradeCount
            }, function(err, data) {});
        }

    }

    function gsTest(){
        var aa = "{\"id\":51,\"Code\":\"HINDPETRO\",\"InstrumentToken\":359937,\"nres\":5,\"Buy\":456.89,\"TP1\":462.0189,\"TP2\":467.4062,\"TP3\":472.8235,\"TP4\":478.2807,\"Bstp\":451.56,\"Short\":451.56,\"STP1\":446.4931,\"STP2\":441.2205,\"STP3\":435.9879,\"STP4\":430.7753,\"Sstp\":456.89,\"date\":\"\",\"lastTraded\":\"\"}";
        var gs = JSON.parse(aa);
        Gannstrategy.updateGS(gs);

    }






};
