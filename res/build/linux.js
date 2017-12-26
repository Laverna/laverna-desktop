'use strict';

/**
 * Create installers for Linux.
 */
const exec = require('child_process').execSync;
const pkg  = require('../../package.json');

const RELEASE_DIR = 'dist/release/tmp';

console.log('Building Linux packages...');

function onError(err) {
    if (err) {
        console.log(`Error: ${err}`);
        process.exit(1);
    }
}

exec('rm -rf dist/release', onError);

// Create the "desktop" file
exec(`mkdir -p ${RELEASE_DIR}/usr/share/applications`, onError);
exec(`cp -r res/linux/laverna.desktop ${RELEASE_DIR}/usr/share/applications`, onError);

// Copy the icon
exec(`mkdir -p ${RELEASE_DIR}/usr/share/pixmaps`, onError);
exec(`cp app/ui/images/icon/icon-150x150.png ${RELEASE_DIR}/usr/share/pixmaps/laverna.png`, onError);

// Copy the binaries
exec(`cp -r dist/Laverna-linux-x64 ${RELEASE_DIR}/usr/share/laverna`, onError);
exec(`mv ${RELEASE_DIR}/usr/share/laverna/Laverna ${RELEASE_DIR}/usr/share/laverna/laverna`, onError);

const cmd = [
    'fpm',
    `--version ${pkg.version}`,
    `--license ${pkg.license}`,
    '--name laverna',
    '--description "Laverna - note taking app"',
    '--vendor Laverna',
    '--maintainer "Laverna project <lavernaproject@gmail.com>"',
    '--url "https://laverna.cc"',
    '-s dir',
    '--force',
    '-C dist/release/tmp',
    '-p dist/release/',
];

// Create a deb package
exec(cmd.concat('-t deb').join(' '), onError);

// Create a pacman package
exec(cmd.concat('-t pacman').join(' '), onError);

exec('rm -rf dist/release/tmp');
console.log('The packages are available in dist/release directory.');
