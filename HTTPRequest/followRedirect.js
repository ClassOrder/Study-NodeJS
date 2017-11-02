var request = require('request');
var inspect = require('util').inspect;

request(
    "http://localhost:4000/redirect",
    function(err, res, body){
        if(err)throw err;
        console.log(inspect({
            err:err,
            res:{statusCode:res.statusCode},
            body:JSON.parse(body)
        }))
    }
);

/* Basically Redirect count is 10 */

//var options = {
//    url: "http://www.example.com",
//    maxRedirects = 3 //?????what is it?????
//};
//request(options, callback);