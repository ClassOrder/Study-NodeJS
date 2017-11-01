require('http').createServer(function(req, res){
    
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Cache-Control': 'max-age=3600'
    });
    
    var buffer = new Buffer("Not Yet! ");
    
    res.write(buffer);
    
    res.end('Hello World!');

}).listen(4000);