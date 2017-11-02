request.defaults({jar:false});

//

var options = {
    url: "http://www.example.com/",
    jar: false,
};
request(options, callback);

//

var jar = request.jar();
var options = {
    url: "http://www.example.com/",
    jar: jar
};
request(options, callback);