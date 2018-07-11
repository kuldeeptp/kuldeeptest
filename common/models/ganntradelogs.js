'use strict';

module.exports = function (Ganntradelogs) {
    var time = require('time');
    //var app = require('../../server/server');
    var Gannstrategy ;

    if(!client){
        var redis = require('redis');
        var client = redis.createClient();
    }

    Ganntradelogs.trade = function(tick,Gannstrategy){
        this.Gannstrategy = Gannstrategy;
        var token = 'GST-'+tick.Token;
        client.get(token, function(error, data) {
            if(data){
                var gs = JSON.parse(data);
                Ganntradelogs.doTrade(gs,tick);
            }

        });
    }

    // Generate New Trade
    Ganntradelogs.newTrade = function(trade,gs){

       client.set('TL-'+trade.Code,JSON.stringify(trade));
       //Ganntradelogs.updateGS(gs);
        //console.log("New trade is generated ",activeTrades);
        Ganntradelogs.create(trade,function(err, data) {
            if(err){
                console.log('Error in creating Trade Log :',err);
            }
        });

    }

    // Close Active Trade
    Ganntradelogs.updateTrade = function(trade){

        // update database
        Ganntradelogs.update({Code:trade.Code,Price:trade.Price,StopLoss:trade.StopLoss,Active:1,TradeType:trade.TradeType},{
            ExitPrice: trade.ExitPrice,
            ExitTime: getIndianDate(),
            Active: 0
        }, function(err, data) {
            if(err){
                console.log(' Error while updating trade logs : ',err);
            }
            console.log(' Ganntradelogs update1  : ',data,trade);
        });

        // remove from redis
        client.del('TL-'+trade.Code);
        //console.log(' Ganntradelogs.updateTrade triggered : ',trade);
    }

    Ganntradelogs.broacast = function(msg,tl,tp1,tp2){
        tl.Category = 'Old - ';
        tl.msg = msg;
        tl.Strategy="Gann Strategy";
        tl.TP1= tp1;
        tl.TP2= tp2;

        client.publish('ZAdminTradeAlert',JSON.stringify(tl));

        if(tp1 ==0 && tp2 ==0){
             Ganntradelogs.updateTrade(tl);
        }
    }

    //Update Gann Strategy
    Ganntradelogs.updateGS = function(gs){
        var Gannstrategy = app.models.gannstrategy;
        Gannstrategy.updateGS(gs,1);

    }

    // Start trading
    Ganntradelogs.doTrade = function(gs,tick){
        var msg='';

        client.get('TL-'+gs.Code, function(error, trade) {
            if(error) {
                console.log(' Trade error',error);
            }
            //console.log('Redis get trade : ',trade);

            // Trading delay
            var ct = new Date();
            if(gs.lastTraded==''){
                var lt = new Date();
            }else{
                var lt = new Date(gs.lastTraded);
            }

            // Range
            //var range = recalcTrade(gs);

            if (trade) {
                var tl = JSON.parse(trade);
                tl.ExitPrice = tick.LastTradedPrice;
                //console.log('Got redis Trade : ',tl);

                if(tl.TradeType == 1 && tick.LastTradedPrice >= tl.TargetProfit){
                    msg= "@ "+getIndianDate()+" Book Profit at "+ tick.LastTradedPrice;
                    Ganntradelogs.broacast(msg,tl,0,0);
                    Ganntradelogs.updateGS(gs);
                }
                else if(tl.TradeType == 1 && tick.LastTradedPrice <= tl.StopLoss){
                    msg= "@ "+getIndianDate()+" Stop Loss triggered on long at "+ tick.LastTradedPrice;
                    Ganntradelogs.broacast(msg,tl,0,0);
                    Ganntradelogs.updateGS(gs);
                }
                else if(tl.TradeType == -1 && tick.LastTradedPrice <= tl.TargetProfit){
                    msg= "@ "+getIndianDate()+" Book Profit on short trade at "+ tick.LastTradedPrice;
                    Ganntradelogs.broacast(msg,tl,0,0);
                    Ganntradelogs.updateGS(gs);
                }
                else if(tl.TradeType == -1 && tick.LastTradedPrice >= tl.StopLoss){
                    msg= "@ "+getIndianDate()+" Stop Loss triggered on Short at"+ tick.LastTradedPrice;
                    Ganntradelogs.broacast(msg,tl,0,0);
                    Ganntradelogs.updateGS(gs);
                }

            } else {
                //console.log('No Trade is found ',trade);

                if(ct >= lt){
                //if( !(tick.LastTradedPrice > range.t1 && tick.LastTradedPrice < range.t2) || !(tick.LastTradedPrice < range.t1 && tick.LastTradedPrice > range.t2)){
                    //Long Position
                    //Code,price,Bstp,TP,Res,TT
                    var tmpAvg = 0;
                    var tmpTrade = {
                        Code : gs.Code,
                        Price: tick.LastTradedPrice,
                        StopLoss: gs.Bstp,
                        TargetProfit: gs.TP,
                        ExitPrice: 0,
                        EntryTime: getIndianDate(),
                        Active: 1,
                        Res: gs.nres,
                        TradeType: 1
                    };
                    if(tick.LastTradedPrice >= gs.Buy && tick.LastTradedPrice <= gs.TP1 && tick.LastTradedPrice <= gs.TP2 && tick.LastTradedPrice <= gs.TP3 && tick.LastTradedPrice <= gs.TP4){
                        msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;
                        tmpAvg = ( gs.Buy + tick.LastTradedPrice)/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice >=tmpAvg? gs.Buy : gs.Bstp;
                        tmpTrade.TargetProfit = gs.TP1;
                        tmpTrade.TradeType = 1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.TP1,gs.TP2);

                    }
                    else if(tick.LastTradedPrice >= gs.Buy && tick.LastTradedPrice >= gs.TP1 && tick.LastTradedPrice <= gs.TP2 && tick.LastTradedPrice <= gs.TP3 && tick.LastTradedPrice <= gs.TP4){
                        msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.TP1 + gs.TP2 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice >=tmpAvg? gs.TP1 : gs.Buy;

                        Ganntradelogs.broacast(msg,tmpTrade,gs.TP2,gs.TP3);

                        tmpTrade.TargetProfit = gs.TP2;
                        tmpTrade.TradeType = 1;
                        Ganntradelogs.newTrade(tmpTrade,gs);

                    }
                    else if(tick.LastTradedPrice >= gs.Buy && tick.LastTradedPrice >= gs.TP1 && tick.LastTradedPrice >= gs.TP2 && tick.LastTradedPrice <= gs.TP3 && tick.LastTradedPrice <= gs.TP4){
                        msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.TP2 + gs.TP3 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice >=tmpAvg? gs.TP2 : gs.TP1;

                        tmpTrade.TargetProfit = gs.TP3;
                        tmpTrade.TradeType = 1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.TP3,gs.TP4);
                    }
                    else if(tick.LastTradedPrice >= gs.Buy && tick.LastTradedPrice >= gs.TP1 && tick.LastTradedPrice >= gs.TP2 && tick.LastTradedPrice >= gs.TP3 && tick.LastTradedPrice <= gs.TP4){
                        msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.TP3 + gs.TP4 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice >=tmpAvg? gs.TP3 : gs.TP2;

                        tmpTrade.TargetProfit = gs.TP4;
                        tmpTrade.TradeType = 1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.TP4,gs.TP5);

                    }
                    else if(tick.LastTradedPrice >= gs.Buy && tick.LastTradedPrice >= gs.TP1 && tick.LastTradedPrice >= gs.TP2 && tick.LastTradedPrice >= gs.TP3 && tick.LastTradedPrice >= gs.TP4 && tick.LastTradedPrice <= gs.TP5 && tick.LastTradedPrice <= gs.TP6){
                        msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.TP4 + gs.TP5 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice >=tmpAvg? gs.TP4 : gs.TP3;

                        tmpTrade.TargetProfit = gs.TP5;
                        tmpTrade.TradeType = 1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.TP5,gs.TP6);

                    }
                    else if(tick.LastTradedPrice >= gs.Buy && tick.LastTradedPrice >= gs.TP1 && tick.LastTradedPrice >= gs.TP2 && tick.LastTradedPrice >= gs.TP3 && tick.LastTradedPrice >= gs.TP4 && tick.LastTradedPrice >= gs.TP5 && tick.LastTradedPrice <= gs.TP6){
                        msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.TP5 + gs.TP6 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice >=tmpAvg? gs.TP5 : gs.TP4;

                        tmpTrade.TargetProfit = gs.TP6;
                        tmpTrade.TradeType = 1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.TP6,gs.TP6);

                    }
                    // Short Position
                    else if(tick.LastTradedPrice <= gs.Short && tick.LastTradedPrice >= gs.STP1 && tick.LastTradedPrice >= gs.STP2 && tick.LastTradedPrice >= gs.STP3 && tick.LastTradedPrice >= gs.STP4){
                        msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.Short + gs.STP1 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice <= tmpAvg? gs.Short : gs.Sstp;

                        tmpTrade.TargetProfit = gs.STP1;
                        tmpTrade.TradeType = -1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.STP1,gs.STP2);
                    }
                    else if(tick.LastTradedPrice <= gs.Short && tick.LastTradedPrice <= gs.STP1 && tick.LastTradedPrice >= gs.STP2 && tick.LastTradedPrice >= gs.STP3 && tick.LastTradedPrice >= gs.STP4){
                        msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.STP1 + gs.STP2 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice <= tmpAvg? gs.STP1 : gs.Short;

                        tmpTrade.TargetProfit = gs.STP2;
                        tmpTrade.TradeType = -1;
                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.STP2,gs.STP3);
                    }
                    else if(tick.LastTradedPrice <= gs.Short && tick.LastTradedPrice <= gs.STP1 && tick.LastTradedPrice <= gs.STP2 && tick.LastTradedPrice >= gs.STP3 && tick.LastTradedPrice >= gs.STP4){
                        msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.STP2 + gs.STP3 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice <= tmpAvg? gs.Short : gs.STP1;

                        tmpTrade.TargetProfit = gs.STP3;
                        tmpTrade.TradeType = -1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.STP3,gs.STP4);
                    }
                    else if(tick.LastTradedPrice <= gs.Short && tick.LastTradedPrice <= gs.STP1 && tick.LastTradedPrice <= gs.STP2 && tick.LastTradedPrice <= gs.STP3 && tick.LastTradedPrice >= gs.STP4){
                        msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.STP3 + gs.STP4 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice <= tmpAvg? gs.STP1 : gs.STP2;

                        tmpTrade.TargetProfit = gs.STP4;
                        tmpTrade.TradeType = -1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.STP4,gs.STP5);
                    }
                    else if(tick.LastTradedPrice <= gs.Short && tick.LastTradedPrice <= gs.STP1 && tick.LastTradedPrice <= gs.STP2 && tick.LastTradedPrice <= gs.STP3 && tick.LastTradedPrice <= gs.STP4 && tick.LastTradedPrice >= gs.STP5 && tick.LastTradedPrice >= gs.STP6){
                        msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.STP4 + gs.STP5 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice <= tmpAvg? gs.STP2 : gs.STP3;

                        tmpTrade.TargetProfit = gs.STP5;
                        tmpTrade.TradeType = -1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.STP5,gs.STP6);
                    }
                    else if(tick.LastTradedPrice <= gs.Short && tick.LastTradedPrice <= gs.STP1 && tick.LastTradedPrice <= gs.STP2 && tick.LastTradedPrice <= gs.STP3 && tick.LastTradedPrice <= gs.STP4 && tick.LastTradedPrice <= gs.STP5 && tick.LastTradedPrice >= gs.STP6){
                        msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;

                        tmpAvg = ( gs.STP5 + gs.STP6 )/2;
                        tmpTrade.StopLoss = tick.LastTradedPrice <= tmpAvg? gs.STP3 : gs.STP4;

                        tmpTrade.TargetProfit = gs.STP6;
                        tmpTrade.TradeType = -1;

                        Ganntradelogs.newTrade(tmpTrade,gs);
                        Ganntradelogs.broacast(msg,tmpTrade,gs.STP6,gs.STP6);
                    }
                }
            }
        });
    }


    Ganntradelogs.initTade = function(){
        Ganntradelogs.find({where:{Active:1}}, function(err,data) {
            if(err){
                console.log('Error in getting Tradelog from database :',err);
            }else{
                console.log('data arrived : ');
                initTradeLogs(data);
            }
        });
    }

    function initTradeLogs(trade){
        console.log('Starting initialization of Redis TradeLog');
        trade.forEach(function (trade) {
            client.set('TL-'+trade.Code ,JSON.stringify(trade));
            //client.del('TL-'+trade.Code);
        });

        //For testing
        //tsUpdateTest();
        //testNewTrade();
    }


    function getIndianDate(){
        time.tzset("Asia/Calcutta");
        var myDate = time.Date();
        var startDate = new Date();
        return  startDate.toJSON().slice(0, 10)+' '+myDate.toString().slice(16, 24);
    }

    function getIndianTime(){
        time.tzset("Asia/Calcutta");
        var myDate = time.Date();
        return myDate.toString().slice(16, 24);
    }


   function tsUpdateTest(){
       var aa = "{\"Code\":\"HDFC\",\"Price\":1421,\"StopLoss\":1434,\"TargetProfit\":1416,\"ExitPrice\":0,\"EntryTime\":\"2016-10-06 14:01:00\",\"Res\":5,\"Active\":1,\"TradeType\":-1,\"ExitTime\":\"\"}";

       var tick = {
           LastTradedPrice:147.5
       }
       var tl = JSON.parse(aa);
       Ganntradelogs.updateTrade(tick,tl);
   }

   function testNewTrade(){
       //var aa = "{\"Code\":\"IGL\",\"Price\":862,\"StopLoss\":855,\"TargetProfit\":869,\"ExitPrice\":0,\"EntryTime\":\"2016-10-06 15:31:00\",\"Res\":5,\"Active\":1,\"TradeType\":1,\"ExitTime\":\"\"}";
       var aa = "{\"Code\":\"HDFC\",\"Price\":1421,\"StopLoss\":1434,\"TargetProfit\":1416,\"ExitPrice\":0,\"EntryTime\":\"2016-10-10 11:55:00\",\"Res\":5,\"Active\":1,\"TradeType\":-1,\"ExitTime\":\"\"}";
       var tl = JSON.parse(aa);
       Ganntradelogs.newTrade(tl);
   }
    //testNewTrade();
    //tsUpdateTest();

};
