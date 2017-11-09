var net = require('net');

var hostname = 'localhost';
var port = 8000;

var client = new net.Socket();
client.connect(port, hostname, function(){
    console.log('접속 ' + hostname + ':' + port);
    client.write('안녕하세요!');
});

client.on('data', function(data){
    console.log('정보 ' + data);
    client.destroy();
});

client.on('close', function(){
    console.log('접속 종료');
});
