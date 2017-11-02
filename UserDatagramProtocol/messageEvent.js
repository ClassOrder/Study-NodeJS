server.on('message', function(message, rinfo){
    console.log('Receiving %s Message on Server from %s:%d: ', message, rinfo.address, rinfo.port);
});