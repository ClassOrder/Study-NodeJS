/**
* Express 요청 객체에 추가한 헤더와 파라미터
* query         클라이언트에서 GET 방식으로 전송한 요청 파라미터를 확인합니다. ex) req.query.name
* body          클라이언트에서 POST 방식으로 전송한 요청 파라미터를 확인합니다. 단, body-parser와 같은 외장 모듈을 사용해야 합니다.
* header(name)  헤더를 확인합니다.
*/

var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next){
    console.log('첫번째 미들웨어');
    
    var userAgent = req.header('User-Agent');
    var paramName = req.query.name;
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    if(paramName!=undefined){        
        res.write('<h1>Express 서버 기동 응답 결과</h1>');
        res.write('<div><p>User-Agent: ' + userAgent + '</p></div>');
        res.write('<div><p>Param name: ' + paramName + '</p></div>');
        res.end();
    } else {
        res.write('<h1>Express 서버 기동 응답 파라미터가 없는 결과</h1>');
        res.write('<div><p>User-Agent: ' + userAgent + '</p></div>');
        res.end();
    }
    
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버 기동 ! ! !');
});