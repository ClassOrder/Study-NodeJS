var net = require('net');
var port = 4000;
var conn = net.createConnection(port);

//

var net = require('net');
var port = 4000;
var host = "www.setthecode.com";
var conn = net.createConnection(port, host);

//

function connectionListener(conn){
    console.log('Binding new Connection.');
}

var conn = net.createConnection(port, host, connectionListener);

//

var conn = net.createConnection(port, connectionListener);

conn.once('connect', connectionListener);