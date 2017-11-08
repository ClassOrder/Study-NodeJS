var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');

httpd.listen(4000);

function handler(req, res){
    fs.readFile(__dirname + '/index.html',
        function(err, data){
            if(err){
                res.writeHead(500);
                return res.end('Cause Error: Can not load index.html.');
            }
            res.writeHead(200);
            res.end(data);
        }
    );
}

io.sockets.on('connection', function(socket){
    
    socket.on('clientMessage', function(content){
        console.log(content);
        socket.emit('serverMessage', 'You: ' + content );
        
        var username = socket.username;
        if(!username){
                username = socket.id;
        }
        socket.broadcast.emit('serverMessage', username + ' said: ' + content);
    });
    
    socket.on('disconnect', function(){
        if(!socket.username){
            socket.username = socket.id;
        }
        socket.broadcast.emit('serverMessage', 'User ' + socket.username + ' disconnected');
    });
    
    socket.on('login', function(username){
        socket.username = username;
        socket.emit('serverMessage', 'Currently logged in as ' + username);
        socket.broadcast.emit('serverMessage', 'User ' + username + ' logged in')
    });
    
    socket.emit('login');
});


// https://github.com/socketio/socket.io/blob/master/examples/chat/index.js