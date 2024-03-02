class ComamndParser {
    constructor() {
        this.commands = new Map();
    }
    registerCommand(command, callback) {
        this.commands.set(command, callback);
    }
    executeCommand(commandString) {
        const [command, value] = commandString.split('=');
        const callback = this.commands.get(command);
        if (callback) {
            callback(command, value);
        } else {
            console.error(`Error: ${command} no reconocido. `);
        }
    }
}

module.exports = new ComamndParser(); 