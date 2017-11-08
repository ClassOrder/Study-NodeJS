var tls = require('tls');
var fs = require('fs');
var port = 4001;

var clients = [];

var options = {
    key: fs.readFileSync('serverKey.pem'),
    cert: fs.readFileSync('serverCert.pem'),
    ca: [fs.readFileSync('fake_ca.pem')],
    requestCert: true,
    rejectUnauthorized: true,
}

function distribute(from, data){
    var socket = from.socket;
    clients.forEach(function(client){
        if(client !== from){
            client.write(socket.remoteAddress + ':' + socket.remotePort + ' said: ' + data);
        }
    });
}

var server = tls.createServer(options, function(client){
    
    console.log('Client.authorized: ', client.authorized);
    
    clients.push(client);
    client.on('data', function(data){
        distribute(client, data);
    });
    client.on('close', function(){
        console.log('close Connection');
        clients.splice(clients.indexOf(client), 1);
    });
                              
});

server.listen(port, function(){
        console.log('This port Listening: ', server.address().port);
})