const express = require('express');
const app = express();
const server = require('node:http').createServer(app);
const io = require('socket.io')(server);
const path = require('node:path');
const uniqid = require('uniqid');

// define routes here..
console.log(__dirname);
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));

const clients = [];
io.on('connection', function(socket) {
    console.log('A user connected');
    const userId = uniqid();
    socket.emit('user-id', userId);
    // client.id = 1;
    // client.socket = socket.id;
    // clients.push(client);

    //here is where we can catch chat message

    socket.on('chat-message', function(data){
        io.emit('broadcast', data);
    })

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
});



var port = process.env.PORT || 3000;
server.listen(port, function () {
// Wir geben einen Hinweis aus, dass der Webserer läuft.
console.log('Server is running', port);
});
