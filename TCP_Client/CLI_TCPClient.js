/**
* Base Setting.
*/
var net = require('net');
var port = 4000;
var conn;

/**
* Retry Connect Option.
*/
var retryInterval = 3000;
var retriedTimes = 0;
var maxRetries = 10;

/* Event Resume. */
process.stdin.resume();

(function connect(){
    
    function reconnect(){
        if (retriedTimes >= maxRetries){
            throw new Error('Over Max Retries connect. Forgive Retry connect.');
        }
        retriedTimes++;
        setTimeout(connect, retryInterval);
    }
    
    conn = net.createConnection(port);

    conn.on('connect', function(){
        retriedTimes = 0;
        console.log('Connect Server');
    });

    conn.on('error', function(err){
        console.log('Cause Error on connecting: ', err);
    }); 
    
//    conn.on('close', function(){
//        console.log('Close Connection. Retry connect..');
//        reconnect();
//    });
    
    conn.on('close', function(){
        if(!qutting){
            console.log('Close Connection. Retry connect..');
        }
    })
    
    
//    conn.pipe(process.stdout, { end: false });
    
    /* connect Writable Stream and User Input Readable Stream. */
    process.stdin.pipe(conn, {end:false});
    
//    process.stdin.on('data', function(data){
//        if (data.toString().trim().toLowerCase() === 'quit'){
//            conn.end();
//            process.stdin.pause();
//        }
//    });
    
//    process.stdin.on('dta', function(data){
//        if (data.toString().trim().toLowerCase() === 'quit'){
//            console.log('Closing .. ');
//            conn.end();
//            process.stdin.end();
//        } else {
//            conn.write(data);
//        }
//    })
    
    var quitting = false;
    
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
    
}());


