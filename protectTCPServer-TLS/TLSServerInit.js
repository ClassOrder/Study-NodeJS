var tls = require('tls');
var fs = require('fs');

var serverOptions = {
    key: fs.readFileSync('./my_key.pem'),
    cert: fs.readFileSync('./my_certificate.pem')
};

var server = tls.createServer(serverOptions);

/**
* requestCert
* rejectUnauthorized
/