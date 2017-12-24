'use strict';

const core  = require('./core');
const {app} = require('electron');

/**
 * Menu for MacOS.
 */
module.exports = [
    {
        label: '&Laverna',
        submenu: [
            {
                label: 'About Laverna',
                click: () => app.emit('lav:trigger', {e: 'lav:about'}),
            },
            {type: 'separator'},
            {
                label: 'Settings',
                click: () => app.emit('lav:trigger', {e: 'lav:settings'}),
            },
            {type: 'separator'},
            {
                label : 'Hide Laverna',
                role  : 'hide',
            },
            {
                label : 'Hide Others',
                role  : 'hideothers',
            },
            {
                label : 'Show All',
                role  : 'unhide',
            },
            {type: 'separator'},
            {
                label       : 'Quit',
                accelerator : 'CmdOrCtrl+Q',
                role        : 'quit',
            },
        ],
    },
].concat(core);
