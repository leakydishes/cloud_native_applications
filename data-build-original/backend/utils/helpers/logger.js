const path = require('path');
const filename = path.join(__dirname, '../../logs/project.log');

// Format for logger
const log = require('simple-node-logger').createSimpleLogger( {
    logFilePath:filename,
    timestampFormat:'YYYY-MM-DD HH:mm:ss'}
);
module.exports = {log};