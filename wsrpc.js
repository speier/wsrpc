var util = require('util');
var EventEmitter = require('events').EventEmitter;

var proxy = require('./proxy');
var mforc = require('./methods'); // hack to allow proxy method names to the client-side

var wsrpc = function() {
    var self = this;

    this.connect = function(url, openCallback) {
        this.cbs = {};
        this.ws = new WebSocket(url);
        this.ws.onopen = function(e) {
            self.emit('open', e);
            if (openCallback) openCallback();
        };
        this.ws.onmessage = function(e) {
            self.msgHandler(e)
        };

        proxy(mforc, this);
    }

    this.init = function(ws, methods) {
        this.ws = ws;
        this.ws.on('message', this.msgHandler);
        this.methods = methods || {};
    }

    this.msgHandler = function(e) {
        var msg = e.data || e;
        self.emit('message', msg);
        try {
            msg = JSON.parse(msg);
        } catch (e) {}
        if (msg.method) {
            var method = self.methods[msg.method];
            method.call(self.methods, msg.args, function(err, res) {
                var mcb = JSON.stringify({
                    err: err,
                    res: res,
                    mcb: msg.method
                });
                self.ws.send(mcb);
            });
        } else if (msg.mcb) { // method callback
            self.cbs[msg.mcb].call(self.cbs, msg.err, msg.res);
        } else if (msg.topic) {
            self.emit(msg.topic, msg.message);
        }
    }

    this.invoke = function(method, args, cb) {
        var msg = JSON.stringify({
            method: method,
            args: args
        });
        this.cbs[method] = cb;
        this.ws.send(msg);
    }

    this.send = function(topic, message) {
        var msg = JSON.stringify({
            topic: topic,
            message: message
        });
        this.ws.send(msg);
    }
}

util.inherits(wsrpc, EventEmitter);
module.exports = new wsrpc();