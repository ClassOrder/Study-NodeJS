var spawn = require('child_process').spawn;

// "ls does_not_exist.txt
var child = spawn('ls',['does_not_exist.txt']);
child.on('exit', function(code){
    console.log('Exit Child process with this code: ' + code);
});