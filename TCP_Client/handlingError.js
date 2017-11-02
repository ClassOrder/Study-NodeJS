//conn.on('error', function(err){
//    console.error('Cause this error: ' + err.message + ', Code: ' + err.code);
//});

var net = require('net');
var conn = net.createConnection('8283');
conn.on('error', function(err){
    console.log('Cause this error of Code: ' + err.code);
});