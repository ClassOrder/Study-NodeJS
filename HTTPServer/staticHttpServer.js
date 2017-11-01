var path = require('path'),
    fs = require('fs');

require('http').createServer(function(req, res){
    var file = path.normalize('.' + req.url);
    console.log('Finding files in SERVER: ', file);
    
    function reportError(err){
        console.log(err);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
    
    path.exists(file, function(exists){
        
    })
})