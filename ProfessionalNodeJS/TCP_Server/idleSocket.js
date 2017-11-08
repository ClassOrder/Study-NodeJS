require('net').createServer(function(socket){

    //
    var timeout = 10000;
    socket.setTimeout(timeout);
    socket.on('timeout', function(){
        socket.write('Idle Timeout, connection closed.');
        socket.end();
    });
    //
    /*
    socket.setTimeout(60000, function(){
        socket.end('Idle Timeout, connection closed.');
    });
    */
}).listen(4001);

// Not worked. Why?