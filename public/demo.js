var wsrpc = require('./wsrpc');

function output(val) {
  document.getElementById('output').value += val + '\n';
}

function dblBalance() {
  var balance = document.getElementById('balance').value;

  // ex1: client initiated async method call
  wsrpc.invoke('dblBalance', balance, function(err, res) {
    console.log('balance set to ' + res);
    output('Balance doubled from ' + balance + ' to ' + res);
  });

  return false;
}

function startDemo() {

  // ex2: subscribe to a server initiated event
  wsrpc.on('memoryUsage', function(msg) {
    output(msg);
  });

}

// open ws connection
wsrpc.connect('ws://localhost:8080');

// call demo function when connected
wsrpc.on('open', startDemo);