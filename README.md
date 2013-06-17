# wsrpc

WebSocket powered RPC proof of concept.

## Usage

### Server:
```
var wsrpc = require('./wsrpc');

wsrpc.init(ws, require('./methods'));
```

### Client:
```
// open ws connection
wsrpc.connect('ws://localhost:8080');

// ex1: client initiated async method call
wsrpc.dblBalance(balance, function(err, res) { 
  console.log('balance set to ' + res);
});
  
// ex2: subscribe to a server initiated event
wsrpc.on('newMessage', function(msg) {
  console.log(msg);
});
```

and ... it works, so I was able to prove my concept! =)

But hey, don't take too serious, the code is a mess, as it was just about a two hours hack.
