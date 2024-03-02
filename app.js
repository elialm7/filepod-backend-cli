require('dotenv').config();

const { program } = require('commander');
const { registerTerminal, fetchFileStatus, subscribeListenerEvents, fetchCleanFile, deleteFilebyid, uploadFile } = require('./Connection.js');
const readline = require('readline');
const commandParser = require('./CommandParser.js');

const fs = require('fs');
const path = require('path');
const figlet = require('figlet');

program.version('1.0.0');
program.option('--listen', 'listens to the server.')
    .option('--command', 'Enter the admin repl');

program.addHelpText('after', () => {
    const options = program.options();
    const listenprovided = options.listen !== undefined;
    const replprovided = options.repl !== undefined;
    if (listenprovided && replprovided) {
        throw new Error('Error: You cannot use both options at the same time.');
    }
});

const welcome = () => {
    console.log('Bienvenido Admin al REPL de FilePod-Backend. v1.0.0 by R. Elias Ojeda');
}
const repl = () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ''
    });
    welcome();
    rl.on('line', (line) => {
        commandParser.executeCommand(line.trim());
    });

    rl.on('close', () => {
        console.log('bye :3');
        process.exit(0);
    });
}
const registerCommands = () => {

    commandParser.registerCommand('serverfiles.status', (command, value) => {
        fetchFileStatus();
    });
    commandParser.registerCommand('serverfiles.clean', (command, value) => {
        fetchCleanFile();
    });
    commandParser.registerCommand('serverfiles.delete', (command, value) => {
        deleteFilebyid(value);
    });
    commandParser.registerCommand('serverfiles.upload', (command, value) => {
        if (!value) {
            console.log(`${command} necesita definir un path al archivo para subir. ej: serverfiles.upload=ejemplol.txt`);
        } else {
            readfile(value);
        }
    });
    commandParser.registerCommand('exit', (command, value) => {
        console.log('bye :3');
        process.exit(0);
    });

}

const readfile = (filename) => {
    const filePath = path.join(process.cwd(), filename);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(`No se pudo leer el archivo ${filename}`);
            return;
        }
        uploadFile(filename, data);
    });
}


function generateBanner(callback) {
    figlet('File Pod CLI ', {
        font: 'standard',
        fontSize: 15,
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

const main = () => {
    generateBanner((err, data) => {
        if (!err) {
            console.log(data);
            init();
        }
    });
}


const init = () => {

    program.parse(process.argv);
    const options = program.opts();
    if (options.listen) {
        console.log('Bienvenido admin al listener de FilePod-backend v1.0.0 by R. Elias Ojeda . ');
        registerTerminal('listener');
        subscribeListenerEvents();
    } else if (options.command) {
        registerTerminal('');
        registerCommands();
        repl();
    }
}

main();



