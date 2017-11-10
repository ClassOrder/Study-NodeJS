/**
* send([body])                          클라이언트에 응답 데이터를 보냅니다. 전달할 수 있는 데이터는 HTML문자열, Buffer 객체, JSON 객체, JSON 배열입니다.
* status(code)                          HTTP 상태 코드를 반환합니다. 상태 코드는 end()나 send() 같은 전송 메소드를 추가로 호출해야 전송할 수 있습니다.
* sendStatus(statusCode)                HTTP 상태 코드를 반환합니다. 상태 코드는 상태 메시지와 함께 전송됩니다.
* redirect([status,] path)              웹 페이지 경로를 강제로 이동시킵니다.
* render(view [, locals][, callback])   뷰 엔진을 사용해 문서를 만든 후 전송합니다.
*/

var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next){
    console.log('첫번째 미들웨어에서 처리');
    
//    req.name = 'Emrys';
    res.send({name:"소녀시대",age:20});
//    next();
});

app.use(function(req, res, next){
    console.log('두번째 미들웨어에서 처리');
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과입니다.</h1>');
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작 ');
});