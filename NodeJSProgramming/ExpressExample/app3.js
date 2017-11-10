var express = require('express'),
    http = require('http');
var app = express();

/* 미들웨어 함수는 순서대로 실행된다 */
/* 첫번쨰 미들웨어 함수 */
app.use(function(req, res, next){
    console.log('첫번째 미들웨어에서 요청을 처리');
    /* req 객체에 app 객체도 들어 있어서 참조가능 ex) req.app */
    req.user = 'mike';
    /* 다음 미들웨어로 넘겨주는 next() 함수 객체 */
    next();
});
/* 두번째 미들웨어 함수 */
app.use(function(req, res, next){
    console.log('두번째 미들웨어에서 요청을 처리');
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과입니다.</h1>');
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});