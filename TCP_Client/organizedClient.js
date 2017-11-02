var net = require('net');
var port = 4000;
var quitting = false;
var conn;
var retryTimeout = 3000;
var retriedTimes = 0;
var maxRetries = 10;

process.stdin.resume();

process.stdin.on('data', function(data){
    if (data.toString().trim().toLowerCase() === 'quit'){
        quitting = true;
        console.log('Closing .. ');
        conn.end();
        process.stdin.pause();
    } else {
        conn.write(data);
    }
});

(function connect(){
    function reconnect(){
        if(retriedTimes >= maxRetries){
            throw new Error('Over max retries count, Forgive reconnect.');
        }
        
        retriedTimes += 1;
        setTimeout(connect, retryTimeout);
    }
    
    conn = net.createConnection(port);
    
    conn.on('connect', function(){
        retriedTimes = 0;
        console.log('Connect success to Server');
    });
    
    conn.on('error', function(err){
        console.log('Cause error on connecting .. ', err);
    });
    
    conn.on('close', function(){
        if(!quitting){
            console.log('Closed Connection, Try reconnect ..');
            reconnect();
        }
    });
    
    conn.pipe(process.stdout, { end: false });
}());