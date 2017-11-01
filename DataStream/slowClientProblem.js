/*

require('http').createServer(function(request, response){
    
    var rs = fs.createReadStream('/path/to/big/file');
    
    rs.on('data', function(data){
        res.write(data);
    });
    
    rs.on('end', function(){
        res.end();
    });
    
}).listen(8080);

change =>

require('http').createServer(function(reqeust, response){
    
    var rs = fs.createReadStream('/path/to/big/file');
    
    rs.on('data', function(data){
        if(!res.write(data)){
            rs.pause();
        }
    })
    
    rs.on('drain', function(){
        rs.resume();
    });
    
    rs.on('end', function(){
        res.end();
    });
    
}).listen(8080);

*/

/*
require('http').createServer(function(request, response){
    
    var rs = fs.createReadStream('/path/to/big/file');
    
    rs.pipe(response);
    
}).listen(8080);
*/
var fs = require('fs');

require('http').createServer(function(request, response){
    
    var rs = fs.createReadStream('/path/to/big/file');
    
    rs.pipe(response, { end: false });
    
    rs.on('end', function(){
        response.write('Response End.');
        response.end;
    });
    
}).listen(8080);