var child_process = require('child_process');

var exec = child_process.exec;

// order "cat *.js | wc -l".
exec('cat *.js | wc -l', function(error, stdout, stderr){
    if(error){
        console.log('Child Process off with Error Code: ' + error.code);
        return;
    }
    console.log(stdout);
});

/**
* Options List.
* #cwd
* #encoding: ascii, utf8, ucs2, base64
* #timeout
* #maxBuffer
* #killSignal
* #env
*/
var options = {
    timeout: 10000,
    killSignal: 'SIGKILL'
};

exec('cat *.js | wc -l', options, function(error, stdout, stderr){
   // ...
});

var env = process.env,
    varName,
    envCopy = {};

// Copy to envCopy from process.env.
for(varName in env){
    envCopy[varName] = env[varName];
}

// Assignment Custom variables to envCopy.
envCopy['CUSTOM ENV VAR'] = 'some value';
envCopy['CUSTOM ENV VAR2'] = 'some other value';

// Execution Command by using process.env and custom variables.
exec('ls -la',{ env: envCopy }, function(error, stdout, stderr){
    if (error) throw error;
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
});

exec('node basicStudy/child.js',{ env: { number: 123 } }, function(error, stdout, stderr){
    if (error) throw error;
    console.log('stdout:\n', stdout);
    console.log('stderr:\n', stderr);
});

var spawn = require('child_process').spawn;
var child = spawn('tail', ['-f', '/var/log/system.log']);

child.stdout.on('data', function(data){
    console.log('Output: ' + data);
});

child.stderr.on('data', function(data){
    console.log('Error Output: ' + data);
});









