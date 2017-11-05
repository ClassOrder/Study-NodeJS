var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');

httpd.listen(4000);

function handler(req, res){
    fs.readFile(__dirname + '/index.html',
        function(err, data){
            if(err){
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function(socket){
    socket.on('clientMessage', function(content){
        socket.emit('serverMessage', 'You: ' + content);
        
        if(!socket.username){
            socket.username = socket.id;
        }
        socket.to('room', function(err, room){
            if(err)throw err;
            var broadcast = socket.broadcast;
            var message = content;
            if(room){
                broadcast.to(room);
            }
            broadcast.emit('serverMessage', socket.username + ' said: ' + message);
        });
    });
    
    socket.on('login', function(username){
        socket.username = username;
        socket.emit('serverMessage', 'Currently logged in as ' + socket.username);
        socket.broadcast.emit('serverMessage', 'User ' + socket.username + ' logged in');
    });
    
    socket.on('disconnet', function(){
        if(!socket.username){
            socket.username = socket.id;
        }
        socket.broadcast.emit('serverMessage', 'User ' + socket.username + ' disconnected');
    });
    
    socket.on('join', function(room){ 
        if(socket.room){
            console.log('OPQWE')
            socket.leave(socket.room);
        }
        socket.join(socket.room);
        if(!socket.username) socket.username = socket.id;
        socket.emit('serverMessage', 'You joined room ' + room);
        socket.broadcast.to(room).emit('serverMessage', 'User ' + socket.username + ' joined this Room.');        
    }); 
    socket.emit('login');
});