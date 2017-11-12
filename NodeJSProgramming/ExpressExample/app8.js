/* router.route(요청 패스).get(실행될 함수); */
/**
* 요청 패스를 라우터 객체에 등록할 때 사용하는 메소드
* get(callback)     GET 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정합니다.
* post(callback)    POST 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정합니다.
* put(callback)     PUT 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정합니다.
* delete(callback)  DELETE 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정합니다.
* all(callback)     모든 요청 방식을 처리하며, 특정 패스 요청이 발생했을 때 사용할 콜백함수를 지정합니다.
*/

var express = require('express'),
    http = require('http'),
    path = require('path');

var bodyParser = require('body-parser'),
    static = require('serve-static');

var app = express(),
    router = express.Router();

router.route('/process/login').post(function(req, res){
    console.log('/process/login 처리함');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버(라우터형)에서 응답한 결과입니다</h1>');
    res.write('<div><p>Param id: ' + paramId + '</p></div>');
    res.write('<div><p>Param password: ' + paramPassword + '</p></div>');
    res.write('<br><br><a href="/public/login2.html">로그인 페이지로 돌아가기</a>');
    res.end();
});

app.all('*', function(req, res){
    res.status(404).send('<h1>앗! 아직 공사 중인 부분에 접근하셨어요! 위험한 지역이지 돌아갑시다! :D 챠오스! </h1>');
});

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(static(path.join(__dirname, 'public')));
app.use('/', router);

app.use(function(req, res, next){
    console.log('첫번째 미들웨어에서 처리함');
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param ID: ' + paramId + '</p></div>');
    res.write('<div><p>Param PASSWORD: ' + paramPassword + '</p></div>');
    rew.end();
});

http.createServer(app).listen(3000);