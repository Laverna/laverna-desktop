'use strict';

const electron      = require('electron');
const contextMenu   = require('electron-context-menu');
const path          = require('path');
const WindowManager = require('./WindowManager');
const SystemTray    = require('./SystemTray');

const {app, Menu} = electron;

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
        this.icon       = path.join(__dirname, '/dist/images/icon/', icon);

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
        app.on('window-all-closed', this.onAllWindowClosed.bind(this));
        app.on('before-quit', this.onBeforeQuit.bind(this));
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
