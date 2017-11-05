/* client */
var socket = io.connect('http://localhost:4000/chat');

/* server */
var chat = io.of('/chat');
chat.on('connection', function(socket){
    socket.on('clientMessage', function(content){
        // ...
    })
})

/* client */
var url = "http://localhost:4000/"
var joinRoom = document.something.value;
var socket = io.connect(url + joinRoom);

/* server */
var nameSpace = "/" + socket.getSomething;
var chat = io.of(nameSpace);
var chat = io.of('/chat');
chat.on('connection', function(socket){
    socket.on('clientMessage', function(content){
        // ...
    })
})