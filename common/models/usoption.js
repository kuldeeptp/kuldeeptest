module.exports = function(Usoption){

    var request = require('request');
    //const csv=require('csvtojson');
   
    Usoption.getUSOption =function(code,date,cb){
        var myJson = [];
        code=code==undefined?'AAPL':code;
        //date=date==undefined?'':date;
        var serviceURL = "https://query1.finance.yahoo.com/v7/finance/options/"+code+"?formatted=true&crumb=Q71U3xWf%2FOT&lang=en-US&region=US&corsDomain=finance.yahoo.com";
        serviceURL=date==undefined?serviceURL : serviceURL+'&date='+date;
        console.log('*************Services URL : ',serviceURL);

        request(serviceURL,function(error, response, body) {
            console.log('BODY : ',body);
            if(error){
                console.log('Error : ',error)
                 return cb(null, {});
            }else {
                return cb(null, JSON.parse(body)); 
         
            }
        })
    }
};