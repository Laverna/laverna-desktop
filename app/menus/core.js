'use strict';

const {app} = require('electron');

/**
 * Core menu items.
 */
module.exports = [
    {
        label: '&File',
        submenu: [
            {
                label       : 'New note',
                accelerator : 'CmdOrCtrl+N',
                click       : () => app.emit('lav:trigger', {e: 'lav:newNote'}),
            },
            {type: 'separator'},
            {
                label   : 'Import',
                submenu : [
                    {
                        label: 'From Evernote',
                        click: () => app.emit('lav:import:evernote'),
                    },
                ],
            },
            {
                label   : 'Backup',
                submenu : [
                    {
                        label : 'Private key',
                        click : () => app.emit('lav:trigger', {e: 'lav:backup:key'}),
                    },
                    {
                        label : 'Everything',
                        click : () => app.emit('lav:trigger', {e: 'lav:backup:data'}),
                    },
                ],
            },
        ],
    },
    {
        label: '&Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'},
        ],
    },
    {
        label: '&View',
        submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'toggledevtools'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'},
        ],
    },
    {
        label: '&Window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'},
        ],
    },
    {
        label: '&Help',
        submenu: [
            {
                label: 'Learn more',
                click: () => app.emit('lav:learnMore'),
            },
            {
                label: 'Documentation',
                click: () => app.emit('lav:docs'),
            },
            {
                label: 'Search/Report issues',
                click: () => app.emit('lav:report'),
            },
        ],
    },
];
