var server = ...
server.close();
server.on('close', function(){
    console.log('Server closed');
});