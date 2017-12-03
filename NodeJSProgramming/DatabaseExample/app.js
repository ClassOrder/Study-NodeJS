/* Express 기본 모듈 불러오기 */
var express = require('express'),
    http = require('http'),
    path = require('path');

/* Express 미들웨어 불러오기 */
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorhandler');

/* 오류 핸들러 모듈 */
var expressErrorHandler = require('express-error-handler');

/* Session 미들웨어 불러오기 */
var expressSession = require('express-session');

/* 익스프레스 객체 생성 */
var app = express();

/* 기본 속성 설정 */
app.set('port', process.env.PORT || 3000);

/* body-parser를 사용해 application/x-www-form-urlencoded 파싱 */
app.use(bodyParser.urlencoded({extended:false}));

/* body-parser를 사용해 application/json 파싱 */
app.use(bodyParser.json());

/* public 폴더를 static으로 오픈 */
app.use('/public', static(path.join(__dirname, 'public')));

/* cookie-parser 설정 */
app.use(cookieParser());

/* session 설정 */
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));



//===== 데이터 베이스 연결하기 =====//

/* 몽고디비 모듈 사용 */
var MongoClient = require('mongodb').MongoClient;

/* 데이터베이스 객체를 위한 변수 선언*/
var database;

/* 데이터베이스 연결 */
function connectDB() {
    /* 데이터베이스 연결정보 */
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    /* 데이터베이스 연결 */
    MongoClient.connect(databaseUrl, function(err, db) {
        if(err) throw err;
        
        console.log('데이터베이스에 연결되었습니다.: ' + databaseUrl);
        
        /* 데이터베이스 변수에 할당 */
        database = db;
    });
}


/* 라우터 객체 참조 */
var router = express.Router();

/* 로그인 라우팅 함수 - 데이터베이스의 정보와 비교 */
router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출');
    
});

/* 라우터 객체 등록 */
app.use('/', router);


//===== 404 오류 페이지 처리 =====//
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//===== 서버 시작 =====//
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다. 포트: ' + app.get('port'));
});


























