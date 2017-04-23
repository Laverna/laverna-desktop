'use strict';
/**
 * Make Electron environment globally available on start.
 */
console.log('Preloading...');
window.electron = require('electron');
