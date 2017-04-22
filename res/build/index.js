'use strict';

/**
 * Build the Electron app for all platforms.
 */
const packager = require('electron-packager');
const path     = require('path');
const options  = {
    dir       : path.join(__dirname, '../../'),
    out       : path.join(__dirname, '../../dist'),
    name      : 'Laverna',
    overwrite : true,
    arch      : 'all',
    ignore    : ['res', '.tern-port$'],
};

/**
 * Run electron-packager.
 *
 * @param {Object} opt
 * @returns {Promise}
 */
function createPackage(opt) {
    return new Promise(resolve => packager(opt, () => resolve()));
}

Promise.all([
    createPackage(Object.assign({platform: 'linux'}, options)),

    // Build for Windows
    createPackage(Object.assign({
        platform             : 'win32',
        icon                 : path.join(__dirname, './app/dist/favicon.ico'),
        win32metadata        : {
            CompanyName      : 'Laverna',
            FileDescription  : 'Note taking app',
            OriginalFilename : 'Laverna',
            ProductName      : 'Laverna',
            InternalName     : 'Laverna',
        },
    }, options)),

    // Build for MacOS
    createPackage(Object.assign({
        platform        : 'darwin',
        icon            : path.join(__dirname, './app/dist/images/icon/icon-512x512.icns'),
        appBundleId     : 'laverna.cc',
        appCategoryType : 'public.app-category.productivity',
    }, options)),
])
.then(() => {
    console.log('Packages are created.');
    process.exit(0);
});
