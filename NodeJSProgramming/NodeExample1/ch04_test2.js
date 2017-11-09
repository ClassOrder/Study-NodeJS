/**
* on(event, listener)               지정한 이벤트의 리스너를 추가합니다.
* once(event, listener)             지정한 이벤트의 리스너를 추가하지만 한 번 실행한 후에는 자동으로 리스너가 제거됩니다.
* removeListener(event, listener)   지정한 이벤트에 대한 리스너를 제거합니다.
*/

process.on('exit', function(){
    console.log('exit 이벤트 발생.');
});

setTimeout(function(){
    console.log('2초 후 시스템 종료 시도함.');
    
    process.exit();
}, 2000);