/**
* 주의사항
* 반드시 라우터를 모두 작성한 후, "라우터 등록" 아래에 에러핸들러를 등록할 것.
* 그렇지 않으면 에러핸들러가 항상 먼저 동작한다.
*/

var express = require('express'),
    http = require('http'),
    path = require('path'),
    expressErrorHandler = require('express-error-handler');

var bodyParser = require('body-parser'),
    static = require('serve-static'),
    router = express.Router();

var app = express();

router.route('/process/login/:name').post(function(req, res){
    console.log('/process/login/:name 처리');
    
    var paramName = req.params.name;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express Server response result</h1>');
    res.write('<div><p>Param name: ' + paramName + '</p></div>');
    res.write('<div><p>Param Password: ' + paramPassword + '</p></div>');
    res.write('<br><br><a href="/public/login3.html">로그인 페이지로 돌아가기</a>');
    res.end();
});

router.route('/loginzero.html').get(function(req, res){
    console.log('/loginzero.html 처리');
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>챠오스!</h1>');
    res.end();
});

var errorHandler = expressErrorHandler({
    static: {
        '404': __dirname+'/public/404.html'
    }
});
app.use('/',router);
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(static(path.join(__dirname,'public')));
app.use(function(req,res,next){
    console.log('첫번째 미들웨어에서 요청 처리');
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    res.writeHead('200',{'Content-Type':'text/html; charset=uft8'});
    res.write('<h1>Express Server Response Result</h1>');
    res.write('<div><p>Param ID: ' + paramId + '</p></div>');
    res.write('<div><p>Param Password: ' + paramPassword + '</p></div>');
    res.end();
});

http.createServer(app).listen(3000);