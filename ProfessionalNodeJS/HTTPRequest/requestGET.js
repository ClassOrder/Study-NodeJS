var http = require('http');

var options = {
    host: "www.google.com",
    port: 80,
    path: "/index.html"
};

http.get(options, function(res){
    console.log("Receiving: " + res.statusCode);
});

/**
* http.get - short method on http.request
* host
* port
* method
* headers
*/

var headers =
{
    "Accept": "text/json",
    "If-Modified-Since": "Sat, 28 Jan 2012 00:00:52 GMT"
}

/* http.request method returns the object 'http.ClientRequest' writerable stream. */