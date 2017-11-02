function handleResponseCallback(res){
    console.log('Receiving:', res);
}

var req = http.request(options, handleResponseCallback);

req.on('socket', function(socket){
    socket.emit('agentRemove');
});

/* Basically, Node do open maximum 5 sockets per host-port */

var options = {
    host: "my.server.com",
    port: 80,
    path: "/path",
    method: "POST",
    agent: false,
};

http.request(options, handleResponseCallback);

/* If you want to more maximum socket. */

var http = require('http');
http.Agent.defaultMaxSockets = 10;

/**/

var http = require('http');
var agentOptions = {
    maxSocket: 10,
};
var agent = new Agent(options);

var requestOptions = {
    host: 'www.google.com',
    port: 80,
    agent: agent,
};
var req = http.request(requestOptions);
// ...
req.end();