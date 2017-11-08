require('net').createServer(function(socket){
    
    //new Connection.
    socket.on('data', function(data){
        // get Data.
    });
    
    socket.on('end', function(data){
        // close connection.
    });
    
    socket.write('Some String');
    
}).listen(4001);

/**
* net.Server event
* listening
* connection
* close
* error
*/