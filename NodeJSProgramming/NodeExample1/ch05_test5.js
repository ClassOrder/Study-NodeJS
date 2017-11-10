var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('connection', function(socket){
    var addr = socket.address();
    console.log('클라이언트가 접속: %s, %d', addr.address, addr.port);
});

server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    
    var filename = 'Celtic-Cross.png';
    
    fs.readFile(filename, function(err, data){
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(data);
        res.end();
    });
});

server.on('close', function(){
    console.log('서버가 종료됩니다.');
});

server.listen(3000);

/**
* MIME Type
* text/plain
* text/html
* text/css
* text/xml
* image/jpeg, image/png
* video/mpeg, audio/mp3
* application/zip
*/