module.exports = function(Dividend){

    var request = require('request');
    const csv=require('csvtojson');
   
    Dividend.getDividend =function(f,s,cb){
        var myJson = [];
        f=f==undefined?'nspl1d1dy':f;
        s=s==undefined?'MO+AXP+AMGN':s;
        var serviceURL = "http://finance.yahoo.com/d/quotes.csv?f="+f+"&s="+s;
        console.log('*************Services URL : ',serviceURL);
        var options = {
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Host': 'finance.yahoo.com',
                'Referer': 'http://finance.yahoo.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }

        request(serviceURL, options,function(error, response, body) {
            
            if(error){
                console.log('Error : ',error)
                 return cb(null, {});
            }else {
                body = "name,symbol,previous,lasttraded,ltd,dividend,yield \n"+body;
                
                csv()
                .fromString(body)
                .on('json',(json)=>{
                    myJson.push(json);
                })
                .on('done',()=>{                
                    console.log('end')
                    console.log('myJson ',myJson);
                    return cb(null, myJson);                     
                })           
            }
        })
    }
};