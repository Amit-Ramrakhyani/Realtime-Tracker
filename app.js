const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
const { constrainedMemory } = require('process');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
    socket.on('sendLocation', function (coords) {
        io.emit('receiveLocation', { id: socket.id, ...coords });
    });
    socket.on('disconnect', function () {
        io.emit('userDisconnect', socket.id);
    });
    console.log('A user connected');
});

app.use("/", function (req, res) {
    res.render("index");
});

server.listen(3000, function () {
    console.log("Server is running on port 3000");
});