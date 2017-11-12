/* 토큰과 함께 요청한 정보 처리하기 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    expressErrorHandler = require('express-error-handler');

var bodyParser = require('body-parser'),
    static = require('serve-static'),
    router = express.Router();

var app = express();


/*****************************/
/* Express Route Normal Part */
/*                           */
/*****************************/
router.route('/process/users/:id').get(function(req, res){
    console.log('/process/users/:id 처리');
    
    var paramId = req.params.id;
    console.log('/process/users와 토큰 %s를 이용해 처리', paramId);
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express Server response result</h1>');
    res.write('<div><p>Param id: '+paramId +'</p></div>');
    res.end();
});

router.route('/process/login/:name').post(function (req, res){
    console.log('/process/login/:name 처리');
    
    var paramName = req.params.name;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead('200', {'Content-Type':'html/text;charset=utf8'});
    res.write('<h1>Express Server response result</h1>');
    res.write('<div><p>Param name: ' + paramName + '</p></div>');
    res.write('<div><p>Param Password: ' + paramPassword + '</p></div>');
    res.write('<br><br><a href="/public/login3.html">로그인 페이지로 돌아가기</a>');
    res.end();
});

router.route('/loginzero.html').get(function(req,res){
    console.log('/loginzero.html 처리');
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>챠오스!</h1>');
    res.end();
});

app.use('/',router);


/****************************/
/* Express Route Error Part */
/*                          */
/****************************/
var errorHandler = expressErrorHandler({
    static: {
        '404':__dirname+'/public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(static(path.join(__dirname,'public')));
app.use(function(req,res,next){
    console.log('첫번째 미들웨어에서 요청처리');
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express Server Response Result</h1>');
    res.write('<div><p>Param ID: ' + paramId + '</p></div>');
    res.write('<div><p>Param Password: ' + paramPassword + '</p></div>');
    res.end();
});

http.createServer(app).listen(3000);
                