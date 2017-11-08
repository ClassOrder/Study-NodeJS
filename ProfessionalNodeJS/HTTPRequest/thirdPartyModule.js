var request = require('request');

request('http://www.acme.com:4001/something?page=2', function(error, response, body){
    // ...
});

/**
* request.put(url)
* request.post(url)
* request.head(url)
* request.del(url)
* request.get(url)
*/

var options = {
    url: "http://www.acme.com:4001/something",
    method: "DELETE",
    headers: { Accept: "application/json" },
    body: new Buffer("Hello World"),
}
