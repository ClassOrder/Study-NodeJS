var connect = require('connect');

var app = connect();

app.use(function(req, res, next){
    next(new Error('Hey!'));
});

/* Response */
app.use(function(req, res){
    res.end('Hello World!');
});

connect.errorHandler.title = 'My Application'; //Title Option.

app.use(connect.errorHandler());

app.listen(8080);