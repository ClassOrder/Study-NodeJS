var test1 = function(req, res) {
    console.log('test 모듈 안에 있는 test1 호출.');

    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});

    /** 뷰 템플릿을 이용하여 렌더링 => 전송 */
    var context = {};
    req.app.render('test1_success', context, function(err, html){
        console.log('rendered: ' + html);

        res.end(html);
    });
};

module.exports.test1 = test1;