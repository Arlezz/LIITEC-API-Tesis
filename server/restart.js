const restart = require('./bin/www');

console.log("Server restarting............");

async function restartServer() {
    await restart();
}

restartServer();
