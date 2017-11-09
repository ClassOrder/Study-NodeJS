var fs = require('fs');

/* 파일을 비동기식 IO로 읽어 들입니다. */
fs.readFile(__dirname + '/package.json', 'utf8', function(err, data){
    /* 읽어들인 데이터를 출력합니다. */
    console.log(data);
});

console.log('프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.');

/**
* readFile(filename, [encoding], [callback])                    비동기식 IO로 파일을 읽어 들입니다.
* readFileSync(filename, [encoding])                            동기식 IO로 파일을 읽어 들입니다.
* writeFile(filename, data, encoding='utf8', [callback])        비동기식 IO로 파일을 씁니다.
* writeFileSync(filename, data, encoding='utf8')                동기식 IO로 파일을 씁니다.
*/