require('dotenv').config();
const token = process.env.TOKEN;
const url = process.env.URL;
const io = require('socket.io-client');
const socket = io(url);
socket.on("connect", () => {
    socket.emit('RegisterTerminalRequest', token);
    socket.on('InvalidToken', (response) => {
        console.log(response);
    });
    socket.on('BackendListener', ({ event, message, date }) => {
        console.log(`${date} :: ${event} :: ${message}`);
    })
});

