require('net').createServer(function(socket){
    var rs = require('fs').createReadStream('README.md');
    rs.pipe(socket);
}).listen(4001);