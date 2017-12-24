'use strict';

const core  = require('./core');
const {app} = require('electron');

core[0].submenu.push({type: 'separator'});
core[0].submenu.push({role: 'quit'});

core[1].submenu.push({type: 'separator'});
core[1].submenu.push({
    label: 'Settings',
    click: () => app.emit('lav:trigger', {e: 'lav:settings'}),
});

/**
 * Menu for Linux.
 */
module.exports = [
].concat(core);
