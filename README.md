### wsrpc

WebSocket powered RPC proof of concept.

Usage:
```
// open ws connection
wsrpc.connect('ws://localhost:8080');

// ex1: client initiated async method call
wsrpc.invoke('setBalance', amount, function(err, res) {
  console.log('balance set to ' + res);
});
  
// ex2: subscribe to a server initiated event
wsrpc.on('newMessage', function(msg) {
  output(msg);
});
```

and ... it works, so I was able to prove my concept! =)

But hey, don't take too serious, the code is a mess, as it was just about a two hours hack.
