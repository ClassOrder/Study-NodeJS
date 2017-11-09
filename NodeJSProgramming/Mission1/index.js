var fs = require('fs');

var readline = require('readline');

function processFile(filename) {
    var instream = fs.createReadStream(filename);
    var reader = readline.createInterface(instream, process.stdout);
     
    var count = 0;
    
    reader.on('line', function(line) {
        console.log('읽어온 데이터 : ' + line);
        
        count += 1;
        
        var tokens = line.split(' ');
        
        if (tokens != undefined && tokens.length > 0) {
            console.log('#' + count + ' -> ' + tokens[0]);
        }
    });

    /* 종료 */
    reader.on('close', function(line) {
        console.log('데이터 읽기 종료');
    });
}

var filename = __dirname + '/data.csv';
processFile(filename);