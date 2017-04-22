'use strict';

const core = require('./core');

core[0].submenu.push({type: 'separator'});
core[0].submenu.push({
    label: 'Settings',
    click: () => {},
});

/**
 * Menu for Linux.
 */
module.exports = [
    {
        label: '&File',
        submenu: [
            {role: 'quit'},
        ],
    },
].concat(core);
