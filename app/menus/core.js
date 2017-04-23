'use strict';

const {app} = require('electron');

/**
 * Core menu items.
 */
module.exports = [
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
