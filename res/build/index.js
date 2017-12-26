'use strict';

/**
 * Build the Electron app for all platforms.
 */
const packager = require('electron-packager');
const path     = require('path');
const exec     = require('child_process').execSync;
const pkg      = require('../../package.json');

const dir     = path.join(__dirname, '../..');
const options = {
    dir,
    out       : path.join(dir, '/dist'),
    name      : 'Laverna',
    overwrite : true,
    arch      : 'all',
    ignore    : [
        'res/build',
        'res/linux',
        'ui-src',
        '.tern-port$',
    ],
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

/**
 * Create tar, zip archives.
 */
function createArchives() {
    const archiveDir = `${dir}/dist/release-archives`;
    const name       = `release-archives/laverna-${pkg.version}`;
    exec(`rm -rf ${archiveDir} && mkdir ${archiveDir}`);
    process.chdir(`${dir}/dist`);

    // Linux
    exec(`tar -czf ${name}-linux-x64.tar.gz ./Laverna-linux-x64`);
    exec(`tar -czf ${name}-linux-ia32.tar.gz ./Laverna-linux-ia32`);

    // Windows
    exec(`zip -r ${name}-windows-x64.zip ./Laverna-win32-x64`);
    exec(`zip -r ${name}-windows-ia32.zip ./Laverna-win32-ia32`);

    // MacOS
    exec(`tar -czf ${name}-macOS-x64.tar.gz ./Laverna-darwin-x64`);
}

Promise.all([
    createPackage(Object.assign({platform: 'linux'}, options)),

    // Build for Windows
    createPackage(Object.assign({
        platform             : 'win32',
        icon                 : path.join(dir, '/app/ui/favicon.ico'),
        win32metadata        : {
            CompanyName      : 'Laverna',
            FileDescription  : 'Laverna - note taking app',
            OriginalFilename : 'Laverna',
            ProductName      : 'Laverna',
            InternalName     : 'Laverna',
        },
    }, options)),

    // Build for MacOS
    createPackage(Object.assign({
        platform        : 'darwin',
        icon            : path.join(dir, '/app/ui/images/icon/icon-512x512.icns'),
        appBundleId     : 'laverna.cc',
        appCategoryType : 'public.app-category.productivity',
    }, options)),
])
.then(() => {
    if (process.env.NODE_ENV === 'release') {
        createArchives();
    }

    console.log('Packages are created.');
    process.exit(0);
});
