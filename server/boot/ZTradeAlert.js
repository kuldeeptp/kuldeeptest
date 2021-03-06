/**
 * Created by tekmint on 21/08/16.
 */
/**
 * Created by kuldeep on 11/07/16.
 */

module.exports = function(app) {

    var redis = require('redis');
    var Ganntradelogs = app.models.ganntradelogs;


    function task(){
        console.log("Running : ",Date());

        var client = redis.createClient();
        client.subscribe("ZAdminTradeAlert");
        client.on('message', function(channel, message) {
                var msg;
                console.log('MSG: ',message);
                msg = JSON.parse(message);
                if(!msg.Category){
                    msg.Category='';
                }


            //console.log('Message \'' + msg.Code + '\' on channel \'' + channel + '\' arrived!');
            msg.to = 'tekmintpty@gmail.com';
            msg.body = "<html><title>" + msg.Code + " Trade Alert</title><body> <p><strong>" + msg.Code + "</strong>  </p> <p>" + msg.msg + "</p> <p>StopLoss : "+msg.StopLoss+" , TP1 : "+msg.TP1+" , TP2 : "+msg.TP2+" </p> <p> <a href='http://dailymint.com.au/'>Dailymint.com.au</a> </p></body></html>";

            app.models.Email.send({
                to: 'tekmintpty@gmail.com,pal.dilip@gmail.com  ',
                from: 'kuldeep.pal@gmail.com',
                subject: msg.Category+' '+msg.Code + ' '+msg.Strategy+' Trade Alert @ '+msg.Res+'Min Chart',
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


    // app.models.Email.send({
    //     to: 'tekmintpty@gmail.com,pal.dilip@gmail.com  ,dilip.pal@uttamgalva.com',
    //     from: 'kuldeep.pal@gmail.com',
    //     subject: "Another test mail",
    //     html: "Another Test body....."
    // }, function(err, mail) {
    //
    //     if(err){
    //         console.log('Error ',err);
    //     }else{
    //         console.log('Mail Sent ',mail.response);
    //     }
    //     //cb(err);
    // });

}
///'{"code":"NIFTY50","trend":"1","price":"8660","since":"5","published":"30160820"}'
