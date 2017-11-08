var fs = require('fs');
var path = './basicStudy/myfile';
fs.open(path, 'r', function(error, fd){
    var rs = fs.createReadStream(null, {
        fd: fd,
        encoding: 'utf8',
    });
    rs.on('data', console.log);
});