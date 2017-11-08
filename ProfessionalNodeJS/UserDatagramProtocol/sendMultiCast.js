var dgram = require('dgram');
var client = dgram.createSocket('udp4');

var message = new Buffer('Multicast Message');

client.bind(4000);
client.setMulticastTTL(10);
client.send(message, 0, message.length, 4000, '230.1.2.3');
client.close();