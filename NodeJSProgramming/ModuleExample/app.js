/* Express 기본 모듈 불러오기 */
var express = require('express'),
    http = require('http'),
    path = require('path');

/* Express 미들웨어 불러오기 */
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorhandler'),
    user = require('./routes/user')

/* 오류 핸들러 모듈 */
var expressErrorHandler = require('express-error-handler');

/* Session 미들웨어 불러오기 */
var expressSession = require('express-session');

/* 익스프레스 객체 생성 */
var app = express();

var crypto = require('crypto');

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

/* 몽구스 모듈 */
var mongoose = require('mongoose');

/* 데이터베이스 객체를 위한 변수 선언*/
var database;

/* 데이터베이스 스키마 객체를 위한 변수 선언 */
var UserSchema;

/* 데이터베이스 모델 객체를 위한 변수 선언 */
var UserModel;

/* 데이터베이스에 연결 */
function connectDB(){
    /* 데이터베이스 연결 정보 */
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', function(){
        console.log('데이터베이스에 연결되었습니다.:' + databaseUrl);
        
        /* user 스키마 및 모델 객체 생성 */
        createUserSchema();
    });
    
    /* 연결 끊어졌을 때 5초 후 재연결 */
    database.on('disconnected', function(){
        console.log('연결이 끊어졌습니다. 5초 후 다시 연결합니다.');
        setInterval(connectDB, 5000);
    });
}

function createUserSchema(){

    /* user_schema.js 모듈 불러오기 */
    UserSchema = require('./database/user_schema').createSchema(mongoose);
        
    /* UserModel 모델 정의 */
    UserModel = mongoose.model("users3", UserSchema);
    console.log('User3 정의함');

    user.init(database, UserSchema, UserModel);
}

/* 라우터 객체 참조 */
var router = express.Router();

/* 라우터 객체 등록 */
app.use('/', router);

/* 사용자를 인증하는 함수 */
var authUser = function(database, id, password, callback) {
    console.log('authUser 호출');
    
    /* 1. 아이디를 사용해 검색 */
    UserModel.findById(id, function(err, results) {
        if(err) {
            callback(err, null);
            return;
        }
        
        console.log('아이디 [%s]로 사용자 검색 결과', id);
        console.dir(results);
        
        if(results.length > 0) {
            console.log('아이디와 일치하는 사용자 찾음');
            /* 2. 비밀번호 확인: 모델 인스턴스 객체를 만들고 authenticate() 메소드 호출 */
            var user = new UserModel({id:id});
            var authenticated = user.authenticate(password, results[0]._doc.salt,
                                                  results[0]._doc.hashed_password);
            if(authenticated) {
                console.log('비밀번호 일치함');
                callback(null, results);
            } else {
                console.log('비밀번호 일치하지 않음');
                callback(null, null);
            }
            
        } else {
            console.log('아이디와 일치하는 사용자를 찾지 못함');
            callback(null, null);
        }
    }); 
}

/* 사용자를 추가하는 함수 */
var addUser = function(database, id, password, name, callback) {
    console.log('addUser 호출: ' + id + ', ' + password + ', ' + name);
    
    /* UserModel의 인스턴스 생성 */
    var user = new UserModel({"id":id, "password":password, "name":name});
    
    /* save()로 저장: 저장성공시 addedUser객체가 파라미터로 전달 */
    user.save(function(err, addedUser){
        if(err){
            callback(err, null);
            return;
        }
        console.log('사용자 데이터 추가함');
        callback(null, addedUser);
    });
};

//===== 404 오류 페이지 처리 =====//
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//===== 서버 시작 =====//

/* 프로세스 종료 시에 데이터베이스 연결 해제 */
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database) {
		database.close();
	}
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다. 포트: ' + app.get('port'));
    
    /* 데이터베이스 연결 */
    connectDB();
    console.log('데이터베이스가 연결되었습니다.');
    
});