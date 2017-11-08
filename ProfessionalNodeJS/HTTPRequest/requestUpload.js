var http = require('http');
var options = {
    host: "www.google.com",
    port: 80,
    path: '/upload',
    method: "POST"
};

var request = http.request(options, function(response){
    console.log("State:", response.statusCode);
    console.log("Header:", response.headers);
    response.setEncoding('utf8');
    response.on('data', function(chunk){
        console.log('Content:', chunk);
    });
});

request.write('Write data.\n');
request.write('Write another data.\n');
request.end();


function responseHandler(res){
    console.log('Receiving reponse: ', res);
}

request.on('response', responseHandler);


/*
* response.statusCode
* response.httpVersion
* response.headers
*/

//http.request(options, function(response){
//    response.setEncoding('utf8');
//    response.on('data', function(data){
//        console.log('Receiving data:',data);
//    });
//});