/* Express 기본 모듈 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    expressErrorHandler = require('express-error-handler'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

/* Express 미들웨어 */
var bodyParser = require('body-parser'),
    static = require('serve-static'),
    router = express.Router();

/* 파일 업로드 미들웨어 */
var multer = require('multer');
var fs = require('fs');

/* 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원 */
var cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 3000);
/* body-parser를 이용하여 application/x-www-form-urlencoded 파싱 */
app.use(bodyParser.urlencoded({extended:false}));
/* body-parser를 이용해 application/json 파싱 */
app.use(bodyParser.json());

/* public 폴더와 uploads 폴더 오픈 */
app.use('/public', static(path.join(__dirname,'public')));
app.use('/uploads', static(path.join(__dirname,'uploads')));

app.use(cookieParser());

app.use(expressSession({
        secret:'my key',
        resave: true,
        saveUninitialized:true       
        }));


/* 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원 */
app.use(cors());


/* multer 미들웨어 사용: 미들웨어 사용 순서 중요! */
/* body-parser => multer => router */
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads')  
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname + Date.now())   
    }
});


/*****************************/
/* Express Route Normal Part */
/*                           */
/*****************************/

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출됨');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    if(req.session.user) {
        console.log('이미 로그인 되어 상품 페이지로 이동합니다.');
        res.redirect('/public/product.html');
    } else {
        req.session.user = {
            id: paramId,
            name: 'Girls on Top',
            authorized: true
        };
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id: ' + paramId + '</p></div>');
        res.write('<div><p>Param password: ' + paramPassword + '</p></div>');
        res.write('<br><br><a href="/process/product">상품페이지로 이동하기</a>');
        res.end();
    }
});

router.route('/process/logout').get(function (req, res) {
    console.log('/process/logout 호출됨');
    
    if(req.session.user) {
        console.log('로그 아웃합니다.');
        
        req.session.destroy(function(err){
            if(err) throw err;
            console.log('세선을 삭제하고 로그아웃 되었습니다.');
            res.redirect('/public/login2.html');
        });
    } else { 
        console.log('아직 로그인되어 있지 않습니다.');
        res.redirect('/public/login2.html');
    }
});

router.route('/process/product').get(function(req,res){
    console.log('/process/product 호출됨');
    
    if(req.session.user){
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    }
});

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




http.createServer(app).listen(3000);