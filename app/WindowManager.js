'use strict';

const {
    BrowserWindow,
    shell,
} = require('electron');

const windowState = require('electron-window-state');
const _           = require('underscore');
const path        = require('path');

/**
 * Window manager.
 *
 * @class
 * @license MPL-2.0
 */
class WindowManager {

    constructor(iconPath) {
        /**
         * URLs which are allowed to be opened in Laverna.
         *
         * @prop {Array}
         */
        this.allowedURLs = [
            'http://localhost:9000',
            `file://${__dirname}/ui/index.html`,
        ];

        /**
         * The previous state of the browser window (width, height, x&y pos)
         *
         * @prop {Object}
         */
        this.state = windowState('main', {
            width  : 1000,
            height : 600,
        });

        /**
         * Browser window options.
         *
         * @prop {Object}
         */
        this.options = {
            width               : this.state.width,
            height              : this.state.height,
            minWidth            : 370,
            minHeight           : 520,
            x                   : this.state.x,
            y                   : this.state.y,
            title               : 'Laverna',
            icon                : iconPath,
            autoHideMenuBar     : true,
            backgroundColor     : '#00a693',
            webPreferences      : {
                contextIsolation: true,
                nodeIntegration : false,
            },
        };
    }

    /**
     * Create the main browser window.
     */
    createMain(options) {
        /**
         * The main browser window.
         *
         * @prop {Object}
         */
        this.win = new BrowserWindow(_.extend({}, this.options, {
            webPreferences      : {
                nodeIntegration : false,
                preload         : path.resolve(path.join(__dirname, 'preload.js')),
            },
        }));

        if (this.state.isMaximized) {
            this.win.maximize();
        }

        // Show developer tools
        if (options.dev) {
            this.win.webContents.openDevTools();
        }

        // Auto-hide to tray
        if (options.tray) {
            this.win.hide();
        }

        // If it's dev environment, don't load the local files
        if (options.dev) {
            this.win.loadURL('http://localhost:9000');
        }
        else {
            this.win.loadURL(`file://${__dirname}/ui/index.html`);
        }
    }

    /**
     * Listen to events triggered by the main window.
     */
    listenToMain() {
        this.win.webContents.on('will-navigate', this.handleURL.bind(this));
        this.win.webContents.on('new-window', this.handleURL.bind(this));
    }

    /**
     * Emit an event to the main window and show the window.
     *
     * @param {String} e
     * @param {Object} data
     */
    sendShow(e, data) {
        this.win.show();
        this.win.send(e, data);
    }

    /**
     * Open a URL in an external application.
     *
     * @param {Object} e
     * @param {String} url
     */
    handleURL(e, url) {
        if (url.search('https://www.dropbox.com/oauth2') !== -1) {
            e.preventDefault();
            this.openOauthWindow(url);
        }
        else if (!this.isAllowedUrl(url) && url.search(/^blob:/) === -1) {
            e.preventDefault();
            shell.openExternal(url);
        }
    }

    /**
     * Return true if a url can be opened in the same Laverna window.
     *
     * @param {String} url
     * @returns {Boolean}
     */
    isAllowedUrl(url) {
        let isAllowed = false;

        this.allowedURLs.forEach(allowed => {
            if ((new RegExp(`^${allowed}`)).test(url)) {
                isAllowed = true;
            }
        });

        return isAllowed;
    }

    /**
     * Open a window to do oAuth authentication.
     *
     * @param {String} url
     */
    openOauthWindow(url) {
        /**
         * The main browser window.
         *
         * @prop {Object}
         */
        const win = new BrowserWindow(_.extend({}, this.options, {
            chrome : false,
            width  : 700,
            height : 520,
            center : true,
        }));

        win.loadURL(url);
        win.webContents.on('will-navigate', (e, url) => this.finalizeOauth(e, url, win));
        win.webContents.on('closed', () => this.sendShow('lav:dropbox:oauth', {}));
    }

    /**
     * Send the oAuth information to the main window.
     *
     * @param {Object} e
     * @param {String} url
     * @param {Object} win
     */
    finalizeOauth(e, url, win) {
        if (url.search('http://localhost:9000/#access_token=') !== -1) {
            e.preventDefault();
            win.close();
            this.sendShow('lav:dropbox:oauth', {url});
        }
    }

    /**
     * Hide or show the main window.
     */
    toggleShow() {
        if (this.win.isVisible()) {
            return this.win.hide();
        }

        this.win.show();
    }

    /**
     * Focus on the main window.
     */
    focusMain() {
        if (this.win.isMinimized()) {
            this.win.restore();
        }

        this.win.focus();
    }

    /**
     * Called before the app is closed.
     */
    onBeforeAppQuit() {
        // Save the window state (width, height...)
        if (this.win) {
            this.state.saveState(this.win);
            this.win = null;
        }
    }

}

module.exports = WindowManager;
