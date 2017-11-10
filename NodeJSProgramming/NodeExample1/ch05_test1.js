var http = require('http');

var server = http.createServer();

var port = 3000;
server.listen(port, function(){
    console.log('웹 서버가 시작되었습니다.: %d', port);
});

/**
* listen(port[, hostname][, backlog][, callback])       서버를 실행하여 대기시킵니다.
* close([callback])                                     서버를 종료합니다.
*/

//var host = '192.168.0.5';
//var port = 3000;
//server.listen(port, host, '50000', function(){
//    console.log('웹 서버가 시작되었습니다: %s, %d', host, port);
//});