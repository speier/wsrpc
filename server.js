var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var wsrpc = require('./wsrpc');

var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(8080);

var wss = new WebSocketServer({
  server: server
});

wss.on('connection', function(ws) {

  wsrpc.init(ws, require('./methods'));

  var id = setInterval(function() {
    var msg = JSON.stringify(process.memoryUsage());
    ws.send(msg);
    wsrpc.send('memoryUsage', msg);
  }, 1000);

  ws.on('close', function() {
    console.log('stopping client interval');
    clearInterval(id);
  });
});