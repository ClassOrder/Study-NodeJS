var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

connection.query(
    "show databases",
    function(err, results, fields){
        console.log(err);
        console.log(results);
        console.log(fields);
        connection.end();
    }
)