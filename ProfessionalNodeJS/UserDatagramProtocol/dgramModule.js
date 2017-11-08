var dgram = require('dgram');
/* udp4: IPv4 || udp6: IPv6 */
var server = dgram.createSocket('udp4');

server.on('message', function(message){
    console.log('Receiving Message on server: ' + message);
});

var port = 4000;
server.on('listening', function(){
    var address = peer.address(); //not worked.
    console.log('Peer listened this address and port: ' + address.address + ':' + address.port);
});
server.bind(port);