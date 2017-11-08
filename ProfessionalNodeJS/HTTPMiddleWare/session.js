var connect = require('connect');
var format = require('util').format;

var app = connect();

/* Middleware setting */
app.use(connect.query());
app.use(connect.cookieParser('My secret String'));
app.use(connect.session({
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

/* Response */
app.use(function(req, res){
    for (var name in req.query){
        req.session[name] = req.query[name];
    }
    res.end(format(req.session) + '\n');
});

app.listen(8080);