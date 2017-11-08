require('net').createServer(function(socket){
    socket.on('error', function(error){
        // do Something.
    });
});

/* WANRING */
/**
* Not good way.
* Normally, this event use for log about whole application states.
*/
process.on('uncaughtException', function(errorr){
    //do Something.
});