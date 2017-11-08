var server = require('dgram').createSocket('udp4');

server.on('message', function(message, rinfo){
    console.log('Server received message from ' + rinfo.address + ':' + rinfo.port)
});

server.bind(4000);
server.addMembership('230.1.2.3');