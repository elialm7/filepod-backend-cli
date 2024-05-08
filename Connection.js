const io = require('socket.io-client');
let token = null;
let url = null;
let socket = null;
const chalk = require('chalk');

const registerTerminal = (type) => {
    token = process.env.TOKEN;
    url = process.env.URL;
    socket = io(url);
    socket.on('disconnect', () => {
        console.log('Se ha perdido la conexion al servidor.');
        process.exit(0);
    });
    listenInvalidToken();
    socket.emit('ListeningTerminalRequest', token);
    socket.on('file-received', (response) => {
        console.log(response);
    });
}

const listenInvalidToken = () => {
    socket.on('InvalidToken', (response) => {
        console.log(response);
    });
}

const subscribeListenerEvents = () => {
    socket.on('BackendListener', ({ optype, opmessage, datenow }) => {
        console.log(`${chalk.blue(new Date(datenow).toUTCString())} :: ${chalk.green(optype)} :: ${chalk.yellow(opmessage)}`);
    });
}

const uploadFile = (filename, filedata, filesize, downloads) => {
    socket.emit('upload-file', {downloads, filename, filedata, filesize});
}

module.exports = {registerTerminal, subscribeListenerEvents, uploadFile};
