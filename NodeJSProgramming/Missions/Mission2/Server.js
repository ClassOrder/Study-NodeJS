var net = require('net');

var server = net.createServer(function (socket){
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    console.log("접속명: " + socket.name);
    
    socket.on('data', function(data){
        console.log('받은 정보: ' + data);
        socket.write(data + ' from server');
    });
    
    socket.on('end', function(){
        console.log('접속 종료' + socket.name);
    });
});

var port = 8000;
server.listen(port);
console.log('시작: '+ port);