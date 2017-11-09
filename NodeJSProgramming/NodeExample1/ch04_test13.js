var fs = require('fs');
var http = require('http');
var server = http.createServer(function(req, res){
    /* 파일을 읽어 응답 스트림과 pipe()로 연결합니다. */
    var instream = fs.createReadStream('./README.txt');
    instream.pipe(res);
});
server.listen(7000, '127.0.0.1');