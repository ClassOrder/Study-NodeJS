var fs = require('fs');
var request = require('request');
var file = fs.createWriteStream('/path/to/my/file');

request.get("http://www.example.com/tmp/test.html").pipe(file);

//

var request = require('request');
var source = request.get("http://my.server.com/images/some_file.jpg");
var target = request.post("http://other.server.com/images/some_files.jpg");
source.pipe(target);