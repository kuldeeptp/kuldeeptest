/**
 * Created by tekmint on 21/08/16.
 */
/**
 * Created by kuldeep on 28/11/16.
 */

module.exports = function(app) {

    var redis = require('redis');


    function task(){
        console.log("Running : ",Date());

        var client = redis.createClient();
        client.subscribe("ZAdminMomentumAlert");
        client.on('message', function(channel, message) {
                var msg;
                //console.log('MSG: ',message);
                msg = JSON.parse(message);


            //console.log('Message \'' + msg.Code + '\' on channel \'' + channel + '\' arrived!');
            msg.to = 'tekmintpty@gmail.com';
            msg.body = msg.momentum+"   " + msg.Code + " by "+msg.percentage+"%"
                +"<br/>  LastTradedPrice: "+msg.tick.LastTradedPrice
                +"<br/>  LastTradeQuantity: "+msg.tick.LastTradeQuantity
                +"<br/>  AverageTradePrice: "+msg.tick.AverageTradePrice
                +"<br/>  VolumeTradedToday: "+msg.tick.VolumeTradedToday
                +"<br/>  TotalBuyQuantity: "+msg.tick.TotalBuyQuantity
                +"<br/>  TotalSellQuantity: "+msg.tick.TotalSellQuantity
                +"<br/>  OpenPrice: "+msg.tick.OpenPrice
                +"<br/>  HighPrice: "+msg.tick.HighPrice
                +"<br/>  LowPrice: "+msg.tick.LowPrice
                +"<br/>  ClosePrice: "+msg.tick.ClosePrice
                ;

            app.models.Email.send({
                to: 'tekmintpty@gmail.com,pal.dilip@gmail.com  ',
                from: 'kuldeep.pal@gmail.com',
                subject: msg.momentum+"   " + msg.Code + " by "+msg.percentage +'%',
                html: msg.body
            }, function(error, info) {
                console.log('email sent!');
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                }
            });

        });
    }
    task();


}

