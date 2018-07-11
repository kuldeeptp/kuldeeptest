'use strict';

module.exports = function (Gannrangetradelogs) {
    var time = require('time');
    var async = require('async');
    var Gannstrategy ;

    if(!client){
        var redis = require('redis');
        var client = redis.createClient();
    }

    Gannrangetradelogs.trade = function(tick,Gannstrategy){
        this.Gannstrategy = Gannstrategy;
        var token = 'GST-'+tick.Token;
        client.get(token, function(error, data) {
            if(data){
                var gs = JSON.parse(data);
                //Gannrangetradelogs.doTrade(gs,tick);
                Gannrangetradelogs.doTradeSL(gs,tick);
                //Gannrangetradelogs.closeOpenTrade(gs,tick);

                Gannrangetradelogs.momentumCheck(tick,gs);
            }
        });
    }

    Gannrangetradelogs.momentumCheck = function(tick,gs){
        client.get('MMT-'+tick.Token, function(error, mdata) {
            console.log('MMT-'+tick.Token +' : ',mdata,error);
            if(mdata){
                var ms = JSON.parse(mdata);
                ms.Code=gs.Code;

                if(Math.abs(Math.round(ms.percentage))+1 == Math.abs( Math.round(tick.NetPriceChangeFromClosingPrice))){
                    client.set('MMT-'+tick.Token,JSON.stringify({percentage: tick.NetPriceChangeFromClosingPrice.toFixed(2)}));
                    // Send momentum alert
                    ms.momentum = tick.NetPriceChangeFromClosingPrice > 0 ? 'Bullish' : 'Bearish';
                    ms.tick = tick;
                    client.publish('ZAdminMomentumAlert',JSON.stringify(ms));

                }
            }else{
                if(Math.abs( Math.round(tick.NetPriceChangeFromClosingPrice)) >= 1){
                    var ms = {percentage: tick.NetPriceChangeFromClosingPrice.toFixed(2)};
                    ms.Code=gs.Code;
                    client.set('MMT-'+tick.Token,JSON.stringify(ms));
                    // Send momentum alert
                    ms.momentum = tick.NetPriceChangeFromClosingPrice > 0 ? 'Bullish' : 'Bearish';
                    ms.tick = tick;
                    client.publish('ZAdminMomentumAlert',JSON.stringify(ms));
                }
            }
        });
    }

    // Generate New Trade
    Gannrangetradelogs.newTrade = function(trade,gs){

        client.set('GRTL-'+trade.Code,JSON.stringify(trade));
        client.set('GST-'+gs.InstrumentToken,JSON.stringify(gs));
        Gannrangetradelogs.updateGS(gs);
        //console.log("New trade is generated ",activeTrades);
        Gannrangetradelogs.create(trade,function(err, data) {
            if(err){
                console.log('Error in creating Trade Log :',err);
            }
        });
    }

    // Close Active Trade
    Gannrangetradelogs.updateTrade = function(trade){

        // update database
        if(trade.ExitPrice > 0){
            Gannrangetradelogs.update({Code:trade.Code,Price:trade.Price,StopLoss:trade.StopLoss,Active:1,TradeType:trade.TradeType},{
                ExitPrice: trade.ExitPrice,
                ExitTime: getIndianDate(),
                Active:  0
            }, function(err, data) {
                if(err){
                    console.log(' stop Error while updating trade logs : ',err);
                }
                console.log(' updateTrade update1  : ',data,trade);
            });

            // remove from redis
            client.del('GRTL-'+trade.Code);
        }else{

            Gannrangetradelogs.update({Code:trade.Code,Price:trade.Price,Active:1,TradeType:trade.TradeType},{
                StopLoss: trade.StopLoss,
                TargetProfit: trade.TargetProfit

            }, function(err, data) {
                if(err){
                    console.log(' update Error while updating trade logs : ',err);
                }
                console.log(' updateTrade update2  : ',data,trade);
            });
            client.set('GRTL-'+trade.Code,JSON.stringify(trade));
        }

        //console.log(' Gannrangetradelogs.updateTrade triggered : ',trade);
    }

    Gannrangetradelogs.broacast = function(msg,tl,tp1,tp2){
        tl.Category = 'Range - ';
        tl.msg = msg;
        tl.Strategy="Gann Strategy";
        tl.TP1= tp1;
        tl.TP2= tp2;

        client.publish('ZAdminTradeAlert',JSON.stringify(tl));

        if(tp1 ==0 && tp2 ==0){
            Gannrangetradelogs.updateTrade(tl);
        }
    }

    //Update Gann Strategy
    Gannrangetradelogs.updateGS = function(gs){
        var Gannstrategy = app.models.gannstrategy;
        //console.log('----------Ganlog : ', gs);
        Gannstrategy.updateGS(gs,2);
    }

    Gannrangetradelogs.closeOpenTrade = function(gs,tick){
        console.log('tick  : ',tick);
        client.get('GRTL-'+gs.Code, function(error, trade) {
            if (error) {
                console.log(' Trade error', error);
            }
            console.log('Redis get trade : ',trade);

            // Trading delay
            var ct = new Date();
            if (gs.lastTraded == '') {
                var lt = new Date();
            } else {
                var lt = new Date(gs.lastTraded);
            }
            if (trade) {
                var tl = JSON.parse(trade);
                tl.ExitTime = lt;
                tl.ExitPrice =  tick.LastTradedPrice;
                tl.Active=0;
                Gannrangetradelogs.updateTrade(tl);
            }
        });

    }



    // Start trading
    Gannrangetradelogs.doTrade = function(gs,tick){
        var msg='';

        client.get('GRTL-'+gs.Code, function(error, trade) {
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

            if (trade) {
                var tl = JSON.parse(trade);

                //console.log('Got redis Trade : ',tl);
                if(tl.TradeType == 1 && tick.LastTradedPrice >= tl.TargetProfit){
                    msg= "@ "+getIndianDate()+" Book Profit at "+ tick.LastTradedPrice;
                    tl.ExitPrice = tick.LastTradedPrice;
                    //if(gs.t1==0 && gs.t2==0 ){
                    var t1t2 = calcT1T2(tl.TargetProfit);
                    gs.t1=t1t2.t1;
                    gs.t2=t1t2.t2;
                    //}
                    Gannrangetradelogs.broacast(msg,tl,0,0);
                    Gannrangetradelogs.updateGS(gs);
                    console.log('**** 11 Book Profit   code, t1,t2, tick ,tl.TargetProfit: ',gs.Code,gs.t1,gs.t2,tick.LastTradedPrice,tl.TargetProfit);

                }
                else if(tl.TradeType == 1 && tick.LastTradedPrice <= tl.StopLoss){
                    msg= "@ "+getIndianDate()+" Stop Loss triggered on long at "+ tick.LastTradedPrice;
                    tl.ExitPrice = tick.LastTradedPrice;
                    //if(gs.t1==0 && gs.t2==0 ){
                    var t1t2 = calcT1T2(getGannValueForStopLoss(gs,tl.StopLoss,1));

                    gs.t1=t1t2.t1;
                    gs.t2=t1t2.t2;
                    //}
                    Gannrangetradelogs.broacast(msg,tl,0,0);
                    Gannrangetradelogs.updateGS(gs);
                    console.log('**** 12 Stop Loss triggered on long  , code, t1,t2, tick,tl.TargetProfit : ',gs.Code,gs.t1,gs.t2,tick.LastTradedPrice,tl.TargetProfit);
                }
                else if(tl.TradeType == -1 && tick.LastTradedPrice <= tl.TargetProfit){
                    msg= "@ "+getIndianDate()+" Book Profit on short trade at "+ tick.LastTradedPrice;
                    tl.ExitPrice = tick.LastTradedPrice;
                    //if(gs.t1==0 && gs.t2==0 ){
                    var t1t2 = calcT1T2(tl.TargetProfit);
                    gs.t1=t1t2.t1;
                    gs.t2=t1t2.t2;
                    //}
                    Gannrangetradelogs.broacast(msg,tl,0,0);
                    Gannrangetradelogs.updateGS(gs);
                    console.log('**** 13 Book Profit on short  i, code, t1,t2, tick ,tl.TargetProfit: ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice,tl.TargetProfit);
                }
                else if(tl.TradeType == -1 && tick.LastTradedPrice >= tl.StopLoss){
                    msg= "@ "+getIndianDate()+" Stop Loss triggered on Short at"+ tick.LastTradedPrice;
                    tl.ExitPrice = tick.LastTradedPrice;
                    //if(gs.t1==0 && gs.t2==0 ){
                    var t1t2 = calcT1T2(getGannValueForStopLoss(gs,tl.StopLoss,-1));
                    gs.t1=t1t2.t1;
                    gs.t2=t1t2.t2;
                    //}
                    Gannrangetradelogs.broacast(msg,tl,0,0);
                    Gannrangetradelogs.updateGS(gs);
                    console.log('**** 14 Book Profit on short  i, code, t1,t2, tick ,stoploss  : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice,tl.StopLoss);
                }

            } else {

                //console.log('No Trade is found ',trade);
                if( (gs.t1==0 && gs.t2==0 ) || !(tick.LastTradedPrice > gs.t1 && tick.LastTradedPrice < gs.t2 ) && !(tick.LastTradedPrice < gs.values[15] && tick.LastTradedPrice > gs.values[7])){

                    //Long Position
                    var tmpTrade = {
                        Code : gs.Code,
                        Price: tick.LastTradedPrice,
                        ExitPrice: 0,
                        EntryTime: getIndianDate(),
                        Active: 1,
                        Res: gs.nres
                    };

                    for(var i=0;i< 15;i++){
                        //console.log("value :",i,' -- ', gs.values[i]);
                        if(tick.LastTradedPrice > gs.values[i] && tick.LastTradedPrice < gs.values[i+1] && i < 7){
                            //go long
                            if(i >= 2){
                                var t1t2 = calcT1T2(gs.values[i]);

                                if(tick.LastTradedPrice > t1t2.t2 ){
                                    msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;
                                    tmpTrade.StopLoss = t1t2.t1 ;
                                    tmpTrade.TargetProfit = gs.values[i+1];
                                    tmpTrade.TradeType = 1;
                                    gs.t1=t1t2.t1;
                                    gs.t2=t1t2.t2;
                                    Gannrangetradelogs.newTrade(tmpTrade,gs);
                                    Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i+2]);
                                    console.log('**** 1 Trade long  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);

                                }else if(tick.LastTradedPrice < t1t2.t1 ){
                                    msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;
                                    tmpTrade.StopLoss = t1t2.t2;
                                    tmpTrade.TargetProfit = gs.values[i-1];
                                    tmpTrade.TradeType = -1;
                                    gs.t1=t1t2.t1;
                                    gs.t2=t1t2.t2;
                                    Gannrangetradelogs.newTrade(tmpTrade,gs);
                                    Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i-2]);
                                    console.log('**** 2 Trade Short i,code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                }
                            }else{
                                if(tick.LastTradedPrice < gs.values[i] ){
                                    console.log('**** 3 No Trade Zone..........  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                }else {
                                    msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;
                                    tmpTrade.TargetProfit = gs.values[i+2];
                                    tmpTrade.TradeType = 1;
                                    tmpTrade.StopLoss =  gs.values[7];
                                    if(gs.t1==0){
                                        gs.t1=0;//tmpTrade.TargetProfit;
                                        gs.t2=0;//gs.values[0];
                                        Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[2]);
                                        Gannrangetradelogs.newTrade(tmpTrade,gs);
                                        console.log('**** 3 Trade long  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                    }else{
                                        var t1t2 = calcT1T2(gs.values[i+1]);

                                        if(tick.LastTradedPrice < t1t2.t1 && tick.LastTradedPrice > gs[0] ){
                                            msg = "@ " + getIndianDate() + " Enter Short @" + tick.LastTradedPrice;
                                            tmpTrade.StopLoss = gs.values[i+1];//gs.values[i] ;
                                            tmpTrade.TargetProfit = gs.values[i];
                                            tmpTrade.TradeType = -1;
                                            gs.t1 = t1t2.t1;
                                            gs.t2 = t1t2.t2;
                                            Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,tmpTrade.TargetProfit);
                                            Gannrangetradelogs.newTrade(tmpTrade,gs);
                                            console.log('**** 31 Trade Short  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                        }

                                    }

                                }
                            }
                            break;

                        }else if(tick.LastTradedPrice < gs.values[i] && tick.LastTradedPrice > gs.values[i+1] && i > 7){
                            // Short Position
                            if(i > 9){
                                var t1t2 = calcT1T2(gs.values[i]);

                                if(tick.LastTradedPrice > t1t2.t2 ){
                                    msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;
                                    tmpTrade.StopLoss = gs.values[i] ;
                                    tmpTrade.TargetProfit = gs.values[i-1];
                                    tmpTrade.TradeType = 1;
                                    gs.t1=t1t2.t1;
                                    gs.t2=t1t2.t2;
                                    Gannrangetradelogs.newTrade(tmpTrade,gs);
                                    Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i-1]);
                                    console.log('**** 4 Trade long  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);

                                }else if(tick.LastTradedPrice < t1t2.t1 ){
                                    msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;
                                    tmpTrade.StopLoss = gs.values[i] ;
                                    tmpTrade.TargetProfit = gs.values[i+1];
                                    tmpTrade.TradeType = -1;
                                    gs.t1=t1t2.t1;
                                    gs.t2=t1t2.t2;
                                    Gannrangetradelogs.newTrade(tmpTrade,gs);
                                    Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i+2]);
                                    console.log('**** 5 Trade Short  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                }

                            }else{
                                if( gs.t1==0 ){
                                    msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;
                                    tmpTrade.TargetProfit = gs.values[i+2];
                                    tmpTrade.TradeType = -1;
                                    tmpTrade.StopLoss = i==8 ? gs.values[15]: gs.values[i-1];

                                    gs.t1=0;//gs.values[i];
                                    gs.t2=0;//tmpTrade.TargetProfit;
                                    Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i+2]);
                                    Gannrangetradelogs.newTrade(tmpTrade,gs);
                                    console.log('**** 6 Trade Short  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                }else{
                                    //for second trade
                                    var t1t2 = calcT1T2(gs.values[i]);
                                    if(tick.LastTradedPrice > gs.values[8] &&  t1t2.t2 > gs.values[8]){
                                        console.log('**** 6 No Trade Zone i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                    }else{
                                        if(tick.LastTradedPrice > t1t2.t2 && tick.LastTradedPrice < gs.values[8]){

                                            msg = "@ " + getIndianDate() + " Enter Long @" + tick.LastTradedPrice;
                                            //tmpTrade.StopLoss = gs.values[i+1];//gs.values[i] ;
                                            tmpTrade.StopLoss = i==8 ? gs.values[15]: gs.values[i+1];
                                            tmpTrade.TargetProfit = gs.values[i];
                                            tmpTrade.TradeType = 1;
                                            gs.t1 = t1t2.t1;
                                            gs.t2 = t1t2.t2;
                                            Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i-1]);
                                            Gannrangetradelogs.newTrade(tmpTrade,gs);
                                            console.log('**** 6 Trade Short  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }
        });

    }


    Gannrangetradelogs.doTradeSL = function(gs,tick){
        var msg='';

        client.get('GRTL-'+gs.Code, function(error, trade) {
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
            if(gs.TradeCount == 0){
                if (trade) {
                    var tl = JSON.parse(trade);

                    if(tl.TradeType == 1 && tick.LastTradedPrice >= tl.TargetProfit){
                        var t1t2 = calcT1T2(tl.TargetProfit);

                        async.series([
                                function(){
                                    gs.t1=t1t2.t1;
                                    gs.t2=t1t2.t2;
                                    msg= "@ "+getIndianDate()+" Trailing Stop moved from "+ tl.StopLoss +' to '+ gs.t1 + 'with target profit ' + gs.t2;
                                    tl.StopLoss = gs.t1
                                    tl.TargetProfit =  t1t2.t2;
                                    Gannrangetradelogs.broacast(msg,tl,0,0);
                                },
                                Gannrangetradelogs.updateGS(gs)],
                            function(){
                                console.log('**** 11 Trailing Stop moved   code, StopLoss,TargetProfit, tick ,tl.TargetProfit: ',gs.Code,gs.t1,gs.t2,tick.LastTradedPrice,tl.TargetProfit);
                            }
                        );
                    }
                    else if(tl.TradeType == 1 && tick.LastTradedPrice <= tl.StopLoss){
                        msg= "@ "+getIndianDate()+" Stop Loss triggered on long at "+ tick.LastTradedPrice;
                        tl.ExitPrice = tick.LastTradedPrice;
                        gs.TradeCount = 1;
                        Gannrangetradelogs.broacast(msg,tl,0,0);

                        async.series([
                                function(){
                                    var t1t2 = calcT1T2(getGannValueForStopLoss(gs,tl.StopLoss,1));
                                    gs.t1=t1t2.t1;
                                    gs.t2=t1t2.t2;
                                },
                                Gannrangetradelogs.updateGS(gs)],
                            function(){
                                console.log('**** 12 Stop Loss triggered on long  i, code, t1,t2, tick,tl.TargetProfit : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice,tl.TargetProfit);
                            }
                        );
                    }
                    else if(tl.TradeType == -1 && tick.LastTradedPrice <= tl.TargetProfit){

                        var t1t2 = calcT1T2(tl.TargetProfit);
                        async.series([
                                function(){
                                    gs.t1=t1t2.t1;
                                    gs.t2=t1t2.t2;
                                    msg= "@ "+getIndianDate()+" Trailing Stop moved from "+ tl.StopLoss +' to '+gs.t2 + 'with target profit '+gs.t1;
                                    tl.StopLoss = gs.t2
                                    tl.TargetProfit =  t1t2.t1;
                                    Gannrangetradelogs.broacast(msg,tl,0,0);
                                },
                                Gannrangetradelogs.updateGS(gs)],
                            function(){
                                console.log('**** 13 Trailing Stop moved   code, StopLoss,TargetProfit, tick ,tl.TargetProfit: ',i,gs.Code,gs.t2,gs.t1,tick.LastTradedPrice,tl.TargetProfit);
                            }
                        );
                    }
                    else if(tl.TradeType == -1 && tick.LastTradedPrice >= tl.StopLoss){
                        msg= "@ "+getIndianDate()+" Stop Loss triggered on Short at"+ tick.LastTradedPrice;
                        tl.ExitPrice = tick.LastTradedPrice;
                        gs.TradeCount = 1;
                        Gannrangetradelogs.broacast(msg,tl,0,0);
                        async.series([
                                function(){
                                    var t1t2 = calcT1T2(getGannValueForStopLoss(gs,tl.StopLoss,-1));
                                    gs.t1=t1t2.t1;
                                    gs.t2=t1t2.t2;
                                },
                                Gannrangetradelogs.updateGS(gs)],
                            function(){
                                console.log('**** 14 Book Profit on short  i, code, t1,t2, tick ,stopLoss  : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice,tl.StopLoss);
                            }
                        );
                    }
                }
                else {

                    //console.log('No Trade is found ',trade);
                    if( (gs.t1==0 && gs.t2==0 ) || !(tick.LastTradedPrice > gs.t1 && tick.LastTradedPrice < gs.t2 ) && !(tick.LastTradedPrice < gs.values[15] && tick.LastTradedPrice > gs.values[7])){

                        //Long Position
                        var tmpTrade = {
                            Code : gs.Code,
                            Price: tick.LastTradedPrice,
                            ExitPrice: 0,
                            EntryTime: getIndianDate(),
                            Active: 1,
                            Res: gs.nres
                        };

                        for(var i=0;i< 15;i++){
                            //console.log("value :",i,' -- ', gs.values[i]);
                            if(tick.LastTradedPrice > gs.values[i] && tick.LastTradedPrice < gs.values[i+1] && i < 7){
                                //go long
                                if(i >= 2){
                                    var t1t2 = calcT1T2(gs.values[i]);

                                    if(tick.LastTradedPrice > t1t2.t2 ){
                                        msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;
                                        tmpTrade.StopLoss = t1t2.t1 ;
                                        tmpTrade.TargetProfit = gs.values[i+1];
                                        tmpTrade.TradeType = 1;
                                        gs.t1=t1t2.t1;
                                        gs.t2=t1t2.t2;
                                        Gannrangetradelogs.newTrade(tmpTrade,gs);
                                        Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i+2]);
                                        console.log('**** 1 Trade long  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);

                                    }else if(tick.LastTradedPrice < t1t2.t1 ){
                                        msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;
                                        tmpTrade.StopLoss = t1t2.t2;
                                        tmpTrade.TargetProfit = gs.values[i-1];
                                        tmpTrade.TradeType = -1;
                                        gs.t1=t1t2.t1;
                                        gs.t2=t1t2.t2;
                                        Gannrangetradelogs.newTrade(tmpTrade,gs);
                                        Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i-2]);
                                        console.log('**** 2 Trade Short i,code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                    }
                                }else{
                                    if(tick.LastTradedPrice < gs.values[i] ){
                                        console.log('**** 3 No Trade Zone..........  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                    }else {
                                        msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;
                                        tmpTrade.TargetProfit = gs.values[i+2];
                                        tmpTrade.TradeType = 1;
                                        tmpTrade.StopLoss =  gs.values[7];
                                        if(gs.t1==0){
                                            gs.t1=0;//tmpTrade.TargetProfit;
                                            gs.t2=0;//gs.values[0];
                                            Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[2]);
                                            Gannrangetradelogs.newTrade(tmpTrade,gs);
                                            console.log('**** 3 Trade long  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                        }else{
                                            var t1t2 = calcT1T2(gs.values[i+1]);

                                            if(tick.LastTradedPrice < t1t2.t1 && tick.LastTradedPrice > gs[0] ){
                                                msg = "@ " + getIndianDate() + " Enter Short @" + tick.LastTradedPrice;
                                                tmpTrade.StopLoss = gs.values[i+1];//gs.values[i] ;
                                                tmpTrade.TargetProfit = gs.values[i];
                                                tmpTrade.TradeType = -1;
                                                gs.t1 = t1t2.t1;
                                                gs.t2 = t1t2.t2;
                                                Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,tmpTrade.TargetProfit);
                                                Gannrangetradelogs.newTrade(tmpTrade,gs);
                                                console.log('**** 31 Trade Short  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                            }

                                        }

                                    }
                                }
                                break;

                            }else if(tick.LastTradedPrice < gs.values[i] && tick.LastTradedPrice > gs.values[i+1] && i > 7){
                                // Short Position
                                if(i > 9){
                                    var t1t2 = calcT1T2(gs.values[i]);

                                    if(tick.LastTradedPrice > t1t2.t2 ){
                                        msg="@ " +getIndianDate() +" Enter long @"+tick.LastTradedPrice;
                                        tmpTrade.StopLoss = gs.values[i] ;
                                        tmpTrade.TargetProfit = gs.values[i-1];
                                        tmpTrade.TradeType = 1;
                                        gs.t1=t1t2.t1;
                                        gs.t2=t1t2.t2;
                                        Gannrangetradelogs.newTrade(tmpTrade,gs);
                                        Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i-1]);
                                        console.log('**** 4 Trade long  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);

                                    }else if(tick.LastTradedPrice < t1t2.t1 ){
                                        msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;
                                        tmpTrade.StopLoss = gs.values[i] ;
                                        tmpTrade.TargetProfit = gs.values[i+1];
                                        tmpTrade.TradeType = -1;
                                        gs.t1=t1t2.t1;
                                        gs.t2=t1t2.t2;
                                        Gannrangetradelogs.newTrade(tmpTrade,gs);
                                        Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i+2]);
                                        console.log('**** 5 Trade Short  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                    }

                                }else{
                                    if( gs.t1==0 ){
                                        msg="@ " +getIndianDate() +" Enter Short @"+tick.LastTradedPrice;
                                        tmpTrade.TargetProfit = gs.values[i+2];
                                        tmpTrade.TradeType = -1;
                                        tmpTrade.StopLoss = i==8 ? gs.values[15]: gs.values[i-1];

                                        gs.t1=0;//gs.values[i];
                                        gs.t2=0;//tmpTrade.TargetProfit;
                                        Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i+2]);
                                        Gannrangetradelogs.newTrade(tmpTrade,gs);
                                        console.log('**** 6 Trade Short  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                    }else{
                                        //for second trade
                                        var t1t2 = calcT1T2(gs.values[i]);
                                        if(tick.LastTradedPrice > gs.values[8] &&  t1t2.t2 > gs.values[8]){
                                            console.log('**** 6 No Trade Zone i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                        }else{
                                            if(tick.LastTradedPrice > t1t2.t2 && tick.LastTradedPrice < gs.values[8]){

                                                msg = "@ " + getIndianDate() + " Enter Long @" + tick.LastTradedPrice;
                                                //tmpTrade.StopLoss = gs.values[i+1];//gs.values[i] ;
                                                tmpTrade.StopLoss = i==8 ? gs.values[15]: gs.values[i+1];
                                                tmpTrade.TargetProfit = gs.values[i];
                                                tmpTrade.TradeType = 1;
                                                gs.t1 = t1t2.t1;
                                                gs.t2 = t1t2.t2;
                                                Gannrangetradelogs.broacast(msg,tmpTrade,tmpTrade.TargetProfit,gs.values[i-1]);
                                                Gannrangetradelogs.newTrade(tmpTrade,gs);
                                                console.log('**** 6 Trade Short  i, code, t1,t2, tick : ',i,gs.Code,gs.t1,gs.t2,tick.LastTradedPrice);
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }


        });

    }

    Gannrangetradelogs.initTrade = function(){
        Gannrangetradelogs.find({where:{Active:1}}, function(err,data) {
            if(err){
                console.log('Error in getting Tradelog from database :',err);
            }else{
                console.log('data arrived : ',data);
                initTradeLogs(data);
            }

        });
    }

    function initTradeLogs(trade){
        console.log('Starting initialization of Redis TradeLog');
        trade.forEach(function (trade) {
            client.set('GRTL-'+trade.Code ,JSON.stringify(trade));
            //client.del('GRTL-'+trade.Code);
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

    function calcT1T2(TP){
        var n1=0.4;
        var n2=0.6;
        var t1=0;
        var t2=0;

        var t1 = Math.sqrt(TP);
        t1 = (t1-0.125*n1)*(t1-0.125*n1);
        t1 = Number((t1).toFixed(4));

        var t2 = Math.sqrt(TP);
        t2 = (t2+0.125*n1)*(t2+0.125*n1);
        t2 = Number((t2).toFixed(4));
        console.log('TP, t1 , t2 ',TP, t1,t2);


        return {t1:t1,t2:t2};
    }

    function getGannValueForStopLoss(gs,upperGann,dir=1){
        for(var i=0;i<gs.length;i++){
            if(gs[i] == upperGann){
                if(dir==-1){
                    console.log('dir , getGannValueForStopLoss : ',dir,gs[i+1]);
                    return gs[i+1];
                }else{
                    console.log('dir , getGannValueForStopLoss : ',dir,gs[i-1]);
                    return gs[i-1];
                }

            }
        }
    }

    function tsUpdateTest(){
        var aa = "{\"Code\":\"HDFC\",\"Price\":1421,\"StopLoss\":1434,\"TargetProfit\":1416,\"ExitPrice\":0,\"EntryTime\":\"2016-10-06 14:01:00\",\"Res\":5,\"Active\":1,\"TradeType\":-1,\"ExitTime\":\"\"}";

        var tick = {
            LastTradedPrice:147.5
        }
        var tl = JSON.parse(aa);
        Gannrangetradelogs.updateTrade(tick,tl);
    }

    function testNewTrade(){
        //var aa = "{\"Code\":\"IGL\",\"Price\":862,\"StopLoss\":855,\"TargetProfit\":869,\"ExitPrice\":0,\"EntryTime\":\"2016-10-06 15:31:00\",\"Res\":5,\"Active\":1,\"TradeType\":1,\"ExitTime\":\"\"}";
        var aa = "{\"Code\":\"HDFC\",\"Price\":1421,\"StopLoss\":1434,\"TargetProfit\":1416,\"ExitPrice\":0,\"EntryTime\":\"2016-10-10 11:55:00\",\"Res\":5,\"Active\":1,\"TradeType\":-1,\"ExitTime\":\"\"}";
        var tl = JSON.parse(aa);
        Gannrangetradelogs.newTrade(tl);
    }
    //testNewTrade();
    //tsUpdateTest();

};
