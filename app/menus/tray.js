'use strict';

const {app} = require('electron');

/**
 * System tray menu.
 */
module.exports = [
    {
        label: 'New note',
        click: () => app.emit('lav:trigger', {e: 'lav:newNote'}),
    },
    {type: 'separator'},
    {
        label: 'Settings',
        click: () => app.emit('lav:trigger', {e: 'lav:settings'}),
    },
    {
        label: 'About',
        click: () => app.emit('lav:trigger', {e: 'lav:about'}),
    },
    {type: 'separator'},
    {role: 'quit'},
];
