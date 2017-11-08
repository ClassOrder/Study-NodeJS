var spawn = require('child_process').spawn;

// "sleep 10"
var child = spawn('sleep', ['10']);

setTimeout(function(){
    child.kill();
}, 1000);

child.on('exit', function(code, signal){
    if(code){
        console.log('Exit Child process with this code: ' + code);
    } else if(signal){
        console.log('Exit Child process with this signal: ' + signal);
    }
});