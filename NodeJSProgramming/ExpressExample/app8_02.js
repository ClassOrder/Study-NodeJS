var express = require('express'),
    http = require('http'),
    path = require('path');

var bodyParser = require('body-parser'),
    static = require('serve-static');

var app = express(),
    router = express.Router();

router.route('/process/login/:name/:nick'/* :name -> Token*/).post(function(req, res){
    console.log('/process/login/:name 처리함');
    
    var paramName = req.params.name;
    var paramNick = req.params.nick;
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버(라우터형+URL파라미터형)에서 응답한 결과입니다</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write('<div><p>Param nick: ' + paramNick + '</p></div>');
    res.write('<div><p>Param id: ' + paramId + '</p></div>');
    res.write('<div><p>Param password: ' + paramPassword + '</p></div>');
    res.write('<br><br><a href="/public/login2.html">로그인 페이지로 돌아가기</a>');
    res.end();
});

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(static(path.join(__dirname, 'public')));
app.use('/', router);

app.use(function(req, res, next){
    console.log('첫번째 미들웨어?에서 처리함');
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param ID: ' + paramId + '</p></div>');
    res.write('<div><p>Param PASSWORD: ' + paramPassword + '</p></div>');
    rew.end();
});

http.createServer(app).listen(3000);