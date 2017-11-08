var connect = require('connect');
var app = connect();

/* query middleware setting */
app.use(connect.query());

/* Response */
app.use(function(req, res){
    res.end(JSON.stringify(req.query));
});

app.listen(8080);