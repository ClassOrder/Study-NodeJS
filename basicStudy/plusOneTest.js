var spawn = require('child_process').spawn;

var child = spawn('node', ['plusOne.js']);
setInterval(function(){
    var number = Math.floor(Math.random() * 10000);
    child.stdin.write(number + "\n");
    
    // Warning : Have to child.stdout."once" not "on"
    child.stdout.once('data', function(data){
        console.log('Child Process responsed ' + data + ' from requsted data ' + number);
    });
}, 1000);

child.stderr.on('data', function(data){
    process.stdout.write(data);
});