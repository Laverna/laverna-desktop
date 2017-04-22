'use strict';

const path  = require('path');
const yargs = require('yargs');
const app   = require('electron').app;
const App   = require('./app');

/**
 * Describe command-line options.
 *
 * @returns {Object} options
 */
function getOptions() {
    const options = yargs(process.argv.slice(1))
    .usage('Usage: $0 <command> [options]')
    .option('dev', {
        alias    : 'd',
        boolean  : true,
        describe : 'Run in development mode (show dev tools on start)',
    })
    .option('tray', {
        alias    : 't',
        boolean  : true,
        describe : 'Hide to tray on start',
    })
    .option('config-dir', {
        alias    : 'configDir',
        describe : 'Override the path to the Laverna configuration directory',
        example  : '--config-dir /home/user/.config/laverna-notes',
    })
    .help()
    .version(app.getVersion());

    return options.argv;
}

/**
 * Override the path to the Laverna configuration directory.
 *
 * @param {Object} options
 */
function setupConfigDir(options) {
    const dir     = options.dev ? 'laverna-dev' : 'laverna';
    let configDir = path.join(app.getPath('appData'), dir);

    if (options.configDir) {
        configDir = options.configDir;
    }

    app.setPath('userData', path.normalize(configDir));
}

/**
 * Start the application.
 */
function start() {
    const options = getOptions();
    setupConfigDir(options);

    // Allow only one instance of the app
    if (!options.dev) {
        const shouldQuit = app.makeSingleInstance(() => global.application.focus());

        if (shouldQuit) {
            app.quit();
        }
    }

    app.on('ready', () => {
        global.application = new App(options);
        global.application.start();
    });
}

start();

module.exports = {getOptions, setupConfigDir, start};
