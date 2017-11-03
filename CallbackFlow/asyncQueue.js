var async = require('async'),
    request = require('request');

function done(err, results){
    if (err){
        throw err;
    }
    console.log('Result: %j', results);
}

var maximumConcurrency = 5;

function worker(task, callback){
    request.post({ uri: 'http://localhost:8080', body: JSON.stringify(task) },
                function(err, res, body){
        callback(err, body && JSON.parse(body));
    });
}

var queue = async.queue(worker, maximumConcurrency);

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function(i){
    
    queue.concurrency = 11;
    
    queue.saturated = function(){
        console.log('Queue is Full.');
    }
    
    queue.empty = function(){
        console.log('Queue is empty.');
    }
    
    queue.push(i, function(err, result){
        if (err) throw err;
        console.log(i + '^2 = %d', result);
    });
    
    queue.drain = function(){
        console.log('Queue is empry. No more task.');
    }
    
});