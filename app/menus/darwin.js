'use strict';

const core = require('./core');

/**
 * Menu for MacOS.
 */
module.exports = [
    {
        label: '&Laverna',
        submenu: [
            {
                label: 'About Laverna',
                click: () => {},
            },
            {type: 'separator'},
            {
                label: 'Settings',
                click: () => {},
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
