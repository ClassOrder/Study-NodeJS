# [Node.js]BaseStudy

##### 표준 콜백 패턴
- CPS, continuation-passing style

~~~javascript
var fs = require('fs');
fs.readFile('/etc/passwd', function(error, fileContent){
    if(error) {
        throw error;
    }
});
~~~

##### 이벤트 이미터 패턴
