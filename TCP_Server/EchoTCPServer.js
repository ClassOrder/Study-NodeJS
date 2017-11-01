var server = require('net').createServer(function(socket){
    
    console.log('new Connection');
    
    socket.setEncoding('utf8');
    
    socket.write('Hello, You can input some string. If you want to close input "quit" word.');
    
    socket.on('data', function(data){
        console.log('Receiving data: ', data.toString());
        if (data.trim().toLowerCase() === 'quit'){
            socket.write('Bye!');
            return socket.end();
        }
        socket.write(data);
    });
    
    socket.on('end', function(){
        console.log('Close Client Connection.');
    })
}).listen(4001);