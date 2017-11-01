var server = require('net').createServer();

var port = 4001;

server.on('listening', function(){
    console.log('Listening next port on Server: ', port);
});

server.on('connection', function(socket){
    console.log('Binding new connection on Server');
    socket.end();
    server.close();
});

server.on('close', function(){
    console.log('Close Server');
});

server.on('error', function(error){
    console.log('Cause Error: ', error.message);
});

server.listen(port);