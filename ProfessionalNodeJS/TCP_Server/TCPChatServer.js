var net = require('net');

var server = net.createServer();

var sockets = [];

server.on('connection', function(socket){
    console.log('Binding Connection');
    
    sockets.push(socket);
    
    socket.on('data', function(data){
        console.log('Receiving Data: ', data);
        
        sockets.forEach(function(otherSocket){
            if(otherSocket !== socket){
                otherSocket.write("Other: " + data);
            }
        });
    });
    
    socket.on('close', function(){
        console.log('Close Connection');
        var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
    });
    
});


server.on('error', function(err){
    console.log('Server Error: ', err.message);
});

server.on('close', function(){
    console.log('Server Close.');
});

server.listen(4001);