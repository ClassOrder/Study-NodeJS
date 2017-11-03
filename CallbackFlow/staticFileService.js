var connect = require('connect');

var app = connect();
var dirname = "/Users/arthur/Documents/NodeStudy/HTTPMiddleWare";

/* Static File Server setting */
app.use(connect.static(dirname + '/public'));

/* Response */
app.use(function(req, res){
    res.end('Hello World!');
});

app.listen(8080);