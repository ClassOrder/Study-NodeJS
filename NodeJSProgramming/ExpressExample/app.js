/* Express 기본 모듈 불러오기 */
var express = require('express'),
    http = require('http');

/* Express 객체 생성 */
var app = express();

/* 기본 포트를 app 객체에 속성으로 설정 */
app.set('port', process.env.PORT || 3000);

/* Express 서버 시작 */
http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 서버를 시작합니다 : ' + app.get('port')); 
});

/**
* Express 서버 객체가 가지고 있는 주요 메소드
* set(name, value)                          서버 설정을 위한 속성을 지정합니다. set() 메소드로 지정한 속성은 get() 메소드로 꺼내어 확인할 수 있습니다.
* get(name)                                 서버 설정을 위해 지정한 속성을 꺼내 옵니다.
* use([path,] function [, function...])     미들웨어 함수를 사용합니다.
* get([path,] function)                     특정 패스로 요청된 정보를 처리합니다.
*/

/**
* 서버 설정을 위해 미리 정해진 주요 속성 이름들
* env               서버 모드를 설정합니다.
* views             뷰들이 들어 있는 폴더 또는 폴더 배열을 설정합니다.
* view engine       디폴트로 사용할 뷰 엔진을 설정합니다.
*/