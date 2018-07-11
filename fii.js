var request = require('request');
var csv = require('csv');
var fs = require("fs");
var NSE = require('./common/nse');
function getFIIData(date="10-04-2017"){
    var serviceURL = "https://nseindia.com/content/nsccl/fao_participant_oi_"+date.replace(/-/g,'')+".csv";
    var options = {

        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Host': 'nseindia.com',
            'Referer': 'http://nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol=INFY&illiquid=0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }


    request(serviceURL, options,function(error, response, data) {

        if(error){
            console.log('Error : ',error)
        }else {

            data=data.replace(/ /g,'_');
            data = data.split('\r\n');
            data.splice(0, 1);
            data.splice(5, 1);
            data.splice(5, 1);

            b=data[1].split(',');

            if(b[0]!='' && b[1]!=''){
                data[0] = 'date,'+data[0];
                data[1] = date+','+data[1];
                data[2] = date+','+data[2];
                data[3] = date+','+data[3];
                data[4] = date+','+data[4];
                data = data.join('\r\n');
                console.log(data);
               // console.log(" ROW 1",data[2]);

                //console.log(" ROW 1",data[0]);
                //console.log(" ROW 2",data[1].replace(/ /g,'_'));
                //console.log(" ROW 5",data[6]);
                fs.writeFile(process.cwd()+'/data/option/oi.csv',data,function(err){
                    if(err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!")
                    NSE.mongoImport('faooi',"/data/option/oi.csv");

                });
            }         
        }

    })
}
getFIIData("19-05-2017");