module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/status', server.loopback.status());
  router.get('/letmein', function(req, res) {

  	var apiKey = '5325324532';
	var secret = 'fsdfsdfdsfds';
	if(req.query.request_token !==null){
		var request_token = req.query.request_token;

		console.log('request_token : ', req.query.request_token);

	  	var KiteConnect = require("kiteconnect").KiteConnect;


		var kc = new KiteConnect(apiKey);

		kc.requestAccessToken(request_token, secret)
			.then(function(response) {
				console.log('Access Token : ',response.data.access_token);
				console.log('Public Token : ',response.data.public_token);
				if(!client){
			        var redis = require('redis');
			        var client = redis.createClient();
			        client.set('access_token',response.data.access_token);
			        client.set('public_token',response.data.public_token);
			        res.send('pong : '+response.data.access_token );
			    }
			})
			.catch(function(err) {
				console.log(err.response);
			})
	}
	 	
    
  });
  server.use(router);
};
