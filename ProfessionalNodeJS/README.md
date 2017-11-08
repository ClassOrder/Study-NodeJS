##### Reference: Professional Node.js:Building JavaScript-Based Scalable Software.

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

### REPL
- Read: 유저의 값을 입력받아 JavaScript 데이터 구조로 메모리에 저장
- Eval: 데이터 처리(Evaluate)
- Print: 결과값 출력
- Loop: Read, Eval, Print를 유저가 종료(<kbd>Ctrl</kbd> + <kbd>C</kbd>)할 때까지 반복

## <지연된 반응을 요구하는 사용자 인터페이스 상호작용>을 개발하는데 도움이 되는 함수들
### setTimeout
- 일정 시간 동안 함수 실행을 미룰 수 있음
~~~javascript
var timeout_ms = 2000;
var timeout = setTimeout(function(){
    console.log("Timeout");
}, timeout_ms);
~~~

### setInterval
- 특정 시간 주기로 함수를 반복 실행할 수 있게 해줌
~~~javascript
var period = 1000;
setInterval(function(){
    console.log("tick");
}, period);
// 예약을 취소하고 싶을 때는 clearInterval(); 호출
~~~
- 반환되는 스케줄링 핸들러를 인자로 전달하여 예약 취소
~~~javascript
var interval = setInterval(function(){
    console.log("tick");
}, 1000);
// ...
clearInterval(interval);
~~~

### clearTimeout
- 함수 호출 예약 취소
~~~javascript
var timeoutTime = 1000;
var timeout = setTimeout(function(){
    console.log("Timeout!");
}, timeoutTime);
clearTimeout(timeout);
~~~
- 타임아웃이 일어나지 않으며, 함수 실행 또한 되지 않음
- 특정 시점에 예약된 실행을 취소 가능
~~~javascript
var timeout = setTimeout(function A(){
    console.log("Timeout!");
}, 2000);

setTimeout(function B(){
    clearTimeout(timeout);
}, 1000);
/**
* A()함수는 실행되지 않는다.
*/
~~~

### process.nextTick
- 다음 이벤트 루프 반복까지 함수 실행 연기
~~~javascript
process.nextTick(function(){
    my_expensive_computation_function();
})
~~~