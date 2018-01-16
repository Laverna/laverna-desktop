'use strict';

const electron      = require('electron');
const contextMenu   = require('electron-context-menu');
const path          = require('path');
const WindowManager = require('./WindowManager');
const SystemTray    = require('./SystemTray');
const pkg           = require('../package.json');
const fs            = require('fs');

const {app, Menu, shell, dialog} = electron;

/**
 * The application class.
 *
 * @class
 * @license MPL-2.0
 */
class App {

    constructor(options) {
        // eslint-disable-next-line
        const icon      = process.platform === 'darwin' ? 'IconMenubarTemplate.png' : 'icon-120x120.png';
        this.icon       = path.join(__dirname, '/ui/images/icon/', icon);

        /**
         * Command-line options.
         *
         * @prop {Object}
         */
        this.options = options;

        this.winManager = new WindowManager(this.icon);
        this.systemTray = new SystemTray(this, this.icon);
    }

    /**
     * Start the application.
     */
    start() {
        // Create menus
        contextMenu();
        this.createAppMenu();

        // Create the main browser window
        this.winManager.createMain(this.options);

        // Start listening to events
        this.listenToEvents();
    }

    /**
     * Create the application menu.
     */
    createAppMenu() {
        let menuName = 'linux';
        if (process.platform === 'darwin' || process.platform === 'win32') {
            menuName = process.platform;
        }

        const menu = Menu.buildFromTemplate(require(`./menus/${menuName}`));
        Menu.setApplicationMenu(menu);
    }

    /**
     * Start listening to events.
     */
    listenToEvents() {
        // Listen to Electron events
        app.on('window-all-closed', this.onAllWindowClosed.bind(this));
        app.on('before-quit', this.onBeforeQuit.bind(this));

        // Listen to events emitted by the main window
        this.winManager.listenToMain();

        // Laverna events
        app.on('lav:trigger', data => this.winManager.sendShow(data.e, data.data));
        app.on('lav:import:evernote', () => this.importEvernote());
        app.on('lav:learnMore', () => shell.openExternal(pkg.homepage));
        app.on('lav:docs',      () => shell.openExternal(pkg.wikipage));
        app.on('lav:report',    () => shell.openExternal(pkg.bugs.url));
    }

    /**
     * Import from Evernote backup file.
     */
    importEvernote() {
        const fPath = dialog.showOpenDialog({
            title      : 'Choose your Evernote backup file',
            properties : ['openFile'],
            filters    : [{name: 'Enex', extensions: ['enex']}],
        })[0];

        const xml   = fs.readFileSync(fPath, {encoding: 'utf8'});
        this.winManager.sendShow('lav:import:evernote', {xml});
    }

    /**
     * Quit the application.
     */
    onAllWindowClosed() {
        app.quit();
    }

    /**
     * Called before the app is closed.
     */
    onBeforeQuit() {
        this.systemTray.destroy();
        this.winManager.onBeforeAppQuit();
    }

    /**
     * Focus on the main window.
     */
    focus() {
        this.winManager.focusMain();
    }

}

module.exports = App;
