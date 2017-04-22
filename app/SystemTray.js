'use strict';

const tmpl         = require('./menus/tray');
const {Tray, Menu} = require('electron');

/**
 * Tray manager.
 *
 * @class
 * @license MPL-2.0
 */
class SystemTray {

    constructor(application, icon) {
        this.app  = application;
        this.tray = new Tray(icon);
        this.tray.setToolTip('Laverna');
        this.createMenu();

        this.tray.on('click', this.onClick.bind(this));
    }

    /**
     * Create the context menu.
     */
    createMenu() {
        this.menu = Menu.buildFromTemplate(tmpl);
        this.tray.setContextMenu(this.menu);
    }

    /**
     * Hide the window to tray on click.
     */
    onClick() {
        this.app.winManager.toggleShow();
    }

    /**
     * Destroy the system tray.
     */
    destroy() {
        if (this.tray) {
            this.tray.destroy();
            this.tray = null;
        }
    }

}

module.exports = SystemTray;
