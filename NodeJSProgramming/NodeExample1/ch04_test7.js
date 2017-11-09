var fs = require('fs');

fs.writeFile('./README.txt', 'Hello World!', function(err){
    if(err){
        console.log('Error: ' + err);
    }
    
    console.log('README.txt 파일에 데이터 쓰기 완료.');
});
    