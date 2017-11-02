conn.write('here is a string for you!');

conn.write('SSDFLMLEMFLMFDLKFMLSDMFL3Df', 'base64');

var buffer = new Buffer('Hello World!');
conn.write(buffer);

/**
* You can pass over second parameter callback function.
* However, callback called only writing data to network, not received data by server.
*/
conn.write('Hey!', function(){
    console.log('Complete writing data.');
});

conn.on('data', function(data){
    console.log('Receiving this data: ', data);
});

conn.setEncoding('base64');