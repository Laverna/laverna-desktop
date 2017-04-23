'use strict';

const core  = require('./core');
const {app} = require('electron');

core[0].submenu.push({type: 'separator'});
core[0].submenu.push({
    label: 'Settings',
    click: () => app.emit('lav:settings'),
});

/**
 * Menu for Linux.
 */
module.exports = [
    {
        label: '&File',
        submenu: [
            {
                label       : 'New note',
                accelerator : 'CmdOrCtrl+N',
                click       : () => app.emit('lav:newNote'),
            },
            {role: 'quit'},
        ],
    },
].concat(core);
