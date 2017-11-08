var request = require("request");
var inspect = require("util").inspect;

var options = {
    url: "http://localhost:4000/abc/def",
    method: "PUT",
};

request(options, function(err, res, body){
    if(err)throw err;
    console.log(inspect({
        err: err,
        res: {statusCode: res.statusCode},
        body: body
    }))
});