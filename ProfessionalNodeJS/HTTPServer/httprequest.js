require('http').createServer(function(req, res){
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end(req.url);
}).listen(4000);

/**
* req.method: GET, POST, DELETE, HEAD ..
* req.headers: Header's property.
* req.url: request URL
*/