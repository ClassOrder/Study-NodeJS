/* 쿠키와 세션 관리하기 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    expressErrorHandler = require('express-error-handler'),
    cookieParser = require('cookie-parser');

var bodyParser = require('body-parser'),
    static = require('serve-static'),
    router = express.Router();

var app = express();

app.use(cookieParser());

/*****************************/
/* Express Route Normal Part */
/*                           */
/*****************************/
router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 호출됨');
    var getCookie = req.cookies;
    res.end(JSON.stringify(getCookie));
});

router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie 호출됨');
    
    /* 쿠키설정 */
    res.cookie('user', {
        id: 'Emrys',
        name: 'Merlin',
        authrized: true
    });
    
    /* redirect로 응답 설정 */
    res.redirect('/process/showCookie');
});

router.route('/process/users/:id').get(function(req, res){
    console.log('/process/users/:id 처리');
    
    var paramId = req.params.id;
    console.log('/process/users와 토큰 %s를 이용해 처리', paramId);
    
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express Server 응답 결과</h1>');
    res.write('<div><p>Param id: ' + paramId + '</p></div>');
    res.end();
});

router.route('/process/login/:name').post(function (req, res){
    console.log('/process/login/:name 처리');
    
    var paramName = req.params.name;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express Server 로그인 응답 결과</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write('<div><p>Param Password: ' + paramPassword + '</p></div>');
    res.write('<br><br><a href="/public/login3.html">로그인 페이지로 이동</a>');
    res.end();
});

router.route('/loginzero.html').get(function (req, res){
    console.log('/loginzero.html 처리');
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>챠오스~!</h1>');
    res.end();
});

app.use('/',router);

/****************************/
/* Express Route Error Part */
/*                          */
/****************************/
var errorHandler = expressErrorHandler({
    static: {
        '404': __dirname + '/public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(static(path.join(__dirname,'public')));
app.use(function(req, res, next){
    console.log('첫번째 미들웨어에서 요청처리');
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express Middleware First</h1>');
    res.write('<div><p>Param id: ' + paramId + '</p></div>');
    res.write('<div><p>Param password: ' + paramPassword + '</p></div>');
    res.end();
});

http.createServer(app).listen(3000);