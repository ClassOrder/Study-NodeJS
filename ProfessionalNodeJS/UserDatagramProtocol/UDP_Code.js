var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on('message', function(message){
    console.log('Receiving message on server: ' + message);
});

var port = 4000;

//server.on('listening', function(){
//    var address = server.address();
//    console.log('Server listened this address and port: ' + address.adress + ":" + address.port);
//});
server.on('message', function(message, rinfo){
    console.log('Receiving %s Message on Server from %s:%d ', message, rinfo.address, rinfo.port);
});

server.bind(port);