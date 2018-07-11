/**
 * Created by kuldeep on 6/10/16.
 */
/**
 * Created by tekmint on 21/08/16.
 */
/**
 * Created by kuldeep on 11/07/16.
 */

module.exports = function(app) {
    /*
    var redis = require('redis');
    var gannStrategies;

    var Gannstrategy = app.models.gannstrategy;
    var Ganntradelog = app.models.ganntradelogs;

    if(sub === undefined ){
        var sub = redis.createClient();
    }


    Gannstrategy.find({}).then(function(data,err){
        if(err){
            console.log('Error in getting Gann data from database');
        }else{
            console.log('data arrived : ');
            initGannRedis(data);
        }

    });


    function initGannRedis(data){
        console.log('Starting initGannRedis');
        data.forEach(function (instrument) {
            sub.set('GST-'+instrument.InstrumentToken + '-'+instrument.nres ,JSON.stringify(instrument));
            //sub.del('GST-'+instrument.InstrumentToken + '-'+instrument.nres +' = ');
        });
    }


    function getGannRedis(token){
        sub.get(token, function(error, data) {
            console.log(' Token data : ',JSON.parse(data));
        });
    }

    function setGannRedis(data){
        console.log(JSON.stringify(data));
        sub.set('GST-'+data.InstrumentToken + '-'+data.nres,JSON.stringify(data));
    }

    function getActiveTrades(token){
        sub.get(token, function(error, data) {
            console.log(' Token data : ',JSON.parse(data));
        });
    }

    function setActiveTrades(trade){
        sub.set('ATL-'+data.InstrumentToken + '-'+data.nres,JSON.stringify(trade));
    }

    function closeActiveTrades(trade){
        sub.del('ATL-'+trade.InstrumentToken + '-'+trade.nres);
    }

    var a = { id: 56,
        Code: 'HCLTECH',
        InstrumentToken: 1850625,
        nres: 10,
        Buy: 111.39,
        TP1: 826.1467,
        TP2: 833.3531,
        TP3: 840.5795,
        TP4: 847.8459,
        Bstp: 812.25,
        Short: 812.25,
        STP1: 805.5426,
        STP2: 798.459,
        STP3: 791.4155,
        STP4: 784.392,
        Sstp: 819.39,
        date: '2016-10-05 14:18:00' };

     var a1 = getGannRedis('GST-3789569-5');

    var b = setGannRedis(a);
    console.log(a,b);
    */

}
///'{"code":"NIFTY50","trend":"1","price":"8660","since":"5","published":"30160820"}'
