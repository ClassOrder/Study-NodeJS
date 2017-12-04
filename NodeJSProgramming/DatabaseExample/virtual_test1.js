//===== 모듈 불러들이기 =====//
var mongodb = require('mongodb');
var mongoose = require('mongoose');

//===== 데이터베이스 연결 ====//
var database;
var UserSchema;
var UserModel;

/* 데이터베이스에 연결하고 응답 객체의 속성으로 db 객체 추가 */
function connectDB() {
    /* 데이터베이스 연결 정보 */
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    /* 데이터베이스 연결 */
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', function() {
        console.log('데이터베이스에 연결되었습니다.: ' + databaseUrl);
        
        /* user 스키마 및 모델 객체 생성 */
        createUserSchema();
        
        /* test 진행함 */
        doTest();
    });
    database.on('disconnected', connectDB);
}