var spawn = require('child_process').spawn;

var child = spawn('ls', ['-la']);

child.stdout.on('data', function(data){
    console.log('Data of Child process: ' + data);
});

child.on('exit', function(code){
    console.log('Exit Child process with this code: ' + code);
})