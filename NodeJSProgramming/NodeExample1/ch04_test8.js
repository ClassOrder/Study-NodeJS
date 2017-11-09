/**
* open(path, flags [, model][, callback])                       파일을 엽니다.
* read(fd, buffer, offset, length, position [, callback])       지정한 부분의 파일 내용을 읽어 들입니다.
* write(fd, buffer, offset, length, position, [, callback])     파일의 지정한 부분에 데이터를 씁니다.
* close(fd [, callback])                                        파일을 닫아 줍니다.
*/

var fs = require('fs');

/* 파일 열기 (쓰기 플래그) */
fs.open('./README.txt', 'w', function(err, fd) {
    if (err) throw err;
    
    var buf = new Buffer('Hello?\n');
    /* 파일 쓰기 */
    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
        if (err) throw err;
        
        console.log(err, written, buffer);
        
        fs.close(fd, function() {
            console.log('파일 열고 데이터 쓰고 파일 닫기 완료.');
        });
    });
});

/**
* fs.open flags
* 'r'       읽기에 사용하는 플래그입니다. 파일이 없으면 예외가 발생합니다.
* 'w'       쓰기에 사용하는 플래그입니다. 파일이 없으면 만들어지고 파일이 있으면 이전 내용을 모두 삭제합니다.
* 'w+'      읽기와 쓰기에 모두 사용하는 플래그입니다. 파일이 없으면 만들어지고 파일이 있으면 이전 내용을 모두 삭제합니다.
* 'a+'      읽기와 추가에 모두 사용하는 플래그입니다. 파일이 없으면 만들어지고 있으면 이전 내용에 새로운 내용을 추가합니다.
*/