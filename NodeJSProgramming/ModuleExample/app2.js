/**
 * 모듈화
 * 
 * @date 2017-12-11
 * @author Emrys
 */
``
 /** Express 기본 모듈 불러오기 */
 let express = require('express');
 let http = require('http');
 let path = require('path');

 /** Express 미들웨어 불러오기 */
 let bodyParser = require('body-parser');
 let cookieParser = require('cookie-parser');
 let static = require('serve-static');
//  let errorHandler = require('errorhandler');

 /** 에러 핸들러 모듈 */
 let expressErrorhandler = require('express-error-handler');

 /** 세션 미들웨어 */
 let expressSession = require('express-session');

 /** 모듈:: 설정 */
 let config = require('./config');

 /** 모듈:: 데이터베이스 */
 let database = require('./database/database');

 /** 모듈:: 라우팅 */
 let route_loader = require('./routes/route_loader');

 /** 익스프레스 */
 let app = express();

 /** 서버 변수 설정 및 static public 폴더 설정 */
 console.log('config.server_port: %d', config.server_port);
 app.set('port', process.env.PORT || config.server_port);

 /** body-parser를 이용해 application/x-www-form-urlencoded 파싱 */
 app.use(bodyParser.urlencoded({ extended: false }));

 /** body-parser를 이용해 application/json 파싱 */
 app.use(bodyParser.json());

 /** public 폴더를 static으로 오픈 */
 app.use('/public', static(path.join(__dirname, 'public')));

 /** cookie-parser 설정 */
 app.use(cookieParser());

 /** 세션 설정 */
 app.use(expressSession({
     secret: 'my key',
     resave: true,
     saveUninitialized: true
 }));

 /** 라우팅 설정 */
 route_loader.init(app, express.Router());

 /** 404 에러 페이지 처리 */
 let errorHandler = expressErrorhandler({
     static: {
         '404': './public/404.html'
     }
 });

 app.use(expressErrorhandler.httpError(404));
 app.use(errorHandler);

 /** 서버시작 */
 /** 프로세스 종료 시에 데이터베이스 연결 해제 */
 process.on('SIGTERM', function() {
     console.log('프로세스가 종료됩니다.');
     app.close();
 });

app.on('close', function() {
    console.log('Express 서버가 종료됩니다.');
    if(database.db) {
        database.db.close();
    }
});

/** Express 서버 시작 */
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다. Port: ' + app.get('port'));

    /** 데이터베이스 초기화 */
    database.init(app, config);
})
