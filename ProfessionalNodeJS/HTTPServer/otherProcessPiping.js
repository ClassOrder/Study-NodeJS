var spawn = require('child_process').spawn;

require('http').createServer(function(req, res){
    var child = spawn('tail', ['-f', '/var/log/system.log']);
    child.stdout.pipe(res);
    res.on('end', function(){
        child.kill();
    });
}).listen(4000);

/**
* Important: If response is closed or shut off network connect, then have to kill or end child process.
*/