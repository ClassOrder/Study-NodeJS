/* Error Handling */
//function errorHandler(){
//    return function(err, req, res, next){
//        if (err){
//            res.writeHead(500, { 'Content-Type': 'text/html' });
//            res.end('<h1>Cause Error!</h1>\n<pre>'+err.stack+'</pre>');
//        } else {
//            next();
//        }
//    }
//}

/* Error Handling Simple */
function errorHandler(){
    return function(err, req, res, next){
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Cause Error!</h1>\n<pre>' + err.stack + '</pre>');
    }
}



module.exports = errorHandler;