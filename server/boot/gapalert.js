/**
 * Created by tekmint on 21/08/16.
 */
/**
 * Created by kuldeep on 28/11/16.
 */

module.exports = function(app) {


    var Symbol = app.models.Symbols;
    
     if(!client){
        var redis = require('redis');
        var client = redis.createClient();
    }


    function task(){
        
        console.log("Running : ",Date());
        // console.log('*************SYMBOL  ',Symbol);
        // Symbol.find({
        //             Token:{ge:1}
        //         }, function(err, symbols) {
        //             //console.log('*************SYMBOL LIST ',symbols);
        //             var i=1;
        //              symbols.forEach(function (sl) {
        //                 console.log('*************SYMBOL LIST i ',i , ' = ' ,sl);
        //                 i++;
        //                 finder['TOK-'+sl.Token] = sl.Code;
        //                 // client.set('TOKEN-'+sl.Token ,sl.Code);
        //                 // for(var i=0;i<10000000;i++){

        //                 // }
        //             });
        // });



        
        client.subscribe("GapAlert");
        client.on('message', function(channel, message) {
                var msg;
                var finder={'54273':'ASHOKLEY','70401':'AUROPHARMA','4464129':'OIL','401153':'ABIRLANUVO','5633':'ACC','6401':'ADANIENT','2763265':'CANBK','3832833':'KSCL','348929':'HINDALCO','2079745':'AJANTPHARM','408065':'INFY','25601':'AMARAJABAT','3400961':'M&MFIN','3057409':'MCLEODRUSS','40193':'APOLLOHOSP','681985':'PIDILITIND','975873':'ZEEL','60417':'ASIANPAINT','2815745':'MARUTI','2955009':'NIITTECH','633601':'ONGC','1510401':'AXISBANK','3699201':'IBREALEST','871681':'TATACHEM','3637249':'TV18BRDCST','519937':'M&M','593665':'NCC','558337':'BOSCHLTD','134657':'BPCL','7458561':'INFRATEL','1215745':'CONCOR','737793':'RELCAPITAL','2977281':'NTPC','3689729':'PAGEIND','197633':'DABUR','2730497':'PNB','758529':'SAIL','70401':'AUROPHARMA','345089':'HEROMOTOCO','315393':'GRASIM','2760193':'ALBK','3771393':'DLF','340481':'HDFC','341249':'HDFCBANK','3861249':'ADANIPORTS','4451329':'ADANIPOWER','1195009':'BANKBARODA','1850625':'HCLTECH','2997505':'JETAIRWAYS','108033':'BHARATFORG','3675137':'MINDTREE','2911489':'BIOCON','3924993':'NMDC','837889':'SRF','1837825':'SYNDIBANK','320001':'CASTROLIND','884737':'TATAMOTORS','5215745':'COALINDIA','3876097':'COLPAL','2752769':'UNIONBANK','2889473':'UPL','951809':'VOLTAS','1921537':'WOCKPHARMA','215553':'DHFL','2800641':'DIVISLAB','225537':'DRREDDY','2714625':'BHARTIARTL','2747905':'HEXAWARE','177665':'CIPLA','1207553':'GAIL','364545':'HINDZINC','3060993':'IDFC','2524673':'ANDHRABANK','1214721':'BANKINDIA','98049':'BEL','112129':'BHEL','636673':'ORIENTBANK','140033':'BRITANNIA','3677697':'IDEA','424961':'ITC','232961':'EICHERMOT','1076225':'MOTHERSUMI','3039233':'GRANULES','2513665':'HAVELLS','2906881':'PTC','7712001':'IBULHSGFIN','381697':'IFCI','141569':'RELINFRA','1041153':'MARICO','1723649':'JINDALSTEL','2661633':'JISLJALEQS','2933761':'JPASSOCIAT','1522689':'SOUTHBANK','492033':'KOTAKBANK','261889':'FEDERALBNK','2796801':'GODREJIND','4574465':'JSWENERGY','160769':'CESC','2061825':'KTKBANK','6386689':'L&TFH','2939649':'LT','2170625':'TVSMOTOR','3834113':'POWERGRID','738561':'RELIANCE','3463169':'GMRINFRA','582913':'MRF','779521':'SBIN','806401':'SIEMENS','1492737':'SINTEX','4267265':'BAJAJ-AUTO','2952193':'ULTRACEMCO','1256193':'ENGINERSIN','359937':'HINDPETRO','325121':'AMBUJACEM','49409':'ARVIND','94977':'BATAINDIA','3905025':'CEATLTD','160001':'CENTURYTEX','2029825':'CADILAHC','3721473':'DISHTV','2585345':'GODREJCP','2883073':'IGL','1346049':'INDUSINDBK','1790465':'KPIT','2672641':'LUPIN','387841':'INDIACEM','101121':'BEML','486657':'CUMMINSIND','1270529':'ICICIBANK','3068673':'ICIL','2905857':'PETRONET','3660545':'PFC','900609':'TORNTPHARM','4454401':'NHPC','857857':'SUNPHARMA','3431425':'SUNTV','952577':'TATACOMM','873217':'TATAELXSI','878593':'TATAGLOBAL','7455745':'PCJEWELLER','784129':'VEDL','969473':'WIPRO','3050241':'YESBANK','3375873':'RCOM','194561':'CROMPGREAV','173057':'EXIDEIND','377857':'IDBI','3580417':'CAIRN','3920129':'IRB','3789569':'HDIL','356865':'HINDUNILVR','415745':'IOC','3001089':'JSWSTEEL','7670273':'JUSTDIAL','3930881':'RECLTD','41729':'APOLLOTYRE','877057':'TATAPOWER','1102337':'SRTRANSFIN','895745':'TATASTEEL','1895937':'GLENMARK','2953217':'TCS','3465729':'TECHM','897537':'TITAN','4632577':'JUBLFOOD','511233':'LICHSGFIN','4343041':'TATAMTRDVR','4278529':'UBL'};
                
                msg = JSON.parse(message);
                console.log('*********GapAlert MSG: ',msg);
                console.log('**** Finder : ',finder[msg.Token]);

            console.log('Message \'' + finder[msg.Token] + '\' on channel \'' + channel + '\' arrived!');
            msg.to = 'tekmintpty@gmail.com';
            msg.body = msg.msg+"   " + msg.Code + " by "+msg.gap+"%"
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

            // app.models.Email.send({
            //     to: 'tekmintpty@gmail.com,pal.dilip@gmail.com',
            //     from: 'kuldeep.pal@gmail.com',
            //     subject: msg.msg+"   " + msg.Code + " by "+msg.gap +'%',
            //     html: msg.body
            // }, function(error, info) {
            //     console.log('email sent!');
            //     if(error){
            //         console.log(error);
            //     }else{
            //         console.log('Message sent: ' + info.response);
            //     }
            // });

        });
    }
    task();


}

