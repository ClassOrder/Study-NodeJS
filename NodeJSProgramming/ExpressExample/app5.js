var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next){
    console.log('첫번째 미들웨어');
    
    res.redirect('http://google.co.kr');
});


http.createServer(app).listen(3000);