# [Node.js]BaseStudy

### 표준 콜백 패턴
- CPS, continuation-passing style: 제어 연속 전달 방식
- Example
~~~javascript
var fs = require('fs');
fs.readFile('/etc/passwd', function(error, fileContent){
    if(error) {
        throw error;
    }
});
~~~

### 이벤트 이미터 패턴
- 표준 인터페이스를 사용하여 이벤트 이미터와 이벤트 리스너를 명확히 분리할 것.
- Example
~~~javascript
var request = http.request(options, function(response){
    response.on("data", function(data){
        console.log("Response Data: ", data);
    });
    response.on("end", function(){
        console.log("Response end.");
    });
});
request.end();
~~~

##### REPL
- Read: 유저의 값을 입력받아 JavaScript 데이터 구조로 메모리에 저장
- Eval: 데이터 처리(Evaluate)
- Print: 결과값 출력
- Loop: Read, Eval, Print를 유저가 종료(<kbd>Ctrl + C</kbd>)할 때까지 반복