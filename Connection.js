const io = require('socket.io-client');
let token = null;
let url = null;
let socket = null;

const registerTerminal = (type) => {
    token = process.env.TOKEN;
    url = process.env.URL;
    socket = io(url);
    socket.on('disconnect', () => {
        console.log('Se ha perdido la conexion al servidor.');
        process.exit(0);
    });
    socket.on('RegisterTerminalResponse', (response) => {
        console.log(response);
    });
    listenInvalidToken();
    socket.emit('RegisterTerminalRequest', token, type);
    socket.on('FileStatusResponse', (statusAsNumber) => {
        console.log(`Server: Hay ${statusAsNumber} de archivos en memoria. `);
    });
    socket.on('CleanFileResponse', (response) => {
        console.log(`Server: se han limpiado ${response} archivos en memoria.`);
    });
    socket.on('deletebyid', (response) => {
        console.log(`Server: ${response}`);
    });
    socket.on('archivo-guardado', (response) => {
        console.log(`link para descarga: ${url}/file/preview/${response}`);
    });
}

const listenInvalidToken = () => {
    socket.on('InvalidToken', (response) => {
        console.log(response);
    });
}

const subscribeListenerEvents = () => {
    socket.on('BackendListener', ({ event, message, date }) => {
        console.log(`${date} :: ${event} :: ${message}`);
    });
}

const fetchFileStatus = () => {
    socket.emit('FileStatusRequest', token);
}

const fetchCleanFile = () => {
    socket.emit('CleanFilesRequest', token);
}

const deleteFilebyid = (id) => {
    socket.emit('DeleteByIdRequest', id, token);
}

const uploadFile = (filename, filedata) => {
    socket.emit('enviar-archivo', filename, filedata);
}

module.exports = { registerTerminal, fetchFileStatus, subscribeListenerEvents, fetchCleanFile, deleteFilebyid, uploadFile };
