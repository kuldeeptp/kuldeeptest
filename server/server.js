var loopback = require('loopback');
var boot = require('loopback-boot');
var redis = require('redis');
//var io = require('socket.io');
app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module){
    app.io = require('socket.io')(app.start());
    app.io.sockets.on('connection', function(socket) {

      console.log('a user connected');
      const subscribe = redis.createClient();
      const publish = redis.createClient();

      socket.on('publish', function(channel, data) {
        publish.publish(channel, data);
      });

      socket.on('psubscribe', function(channel) {
        subscribe.psubscribe(channel);
      });

      subscribe.on("pmessage", function(pattern, channel, message) {
        socket.emit('message', { channel: channel, data: message });
      });
    });
  }
    //app.start();
});
