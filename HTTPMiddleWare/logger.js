var connect = require('connect');
var app = connect();

/* Logger Middleware setting */
/**
* Logger Options.
* tiny
* short
* token => :req[Header], :http-version, :response-time, :remote-addr, :date, :method, :url, :referrer, :user-agent, :status
* (token example)
* var format = ':method :url - :status - :response-time ms';
* app.use(connect.logger(format));
*/
app.use(connect.logger());

/* Response */
app.use(function(req, res){
    res.end('Hello World!');
});

app.listen(8080);