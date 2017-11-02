var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var port = 4000;

server.on('message', function(message, rinfo){
    console.log('Receiving %s message on server from %s:%d', message, rinfo.address, rinfo.port);
});

server.on('message', function(message, rinfo){
    server.send(message,                // message Buffer
               0,                       // message Buffer offset
               message.length,          // message Buffer byte length
               rinfo.port,              // destination of message: port
               rinfo.address);          // destination of message: address
});

server.bind(port);