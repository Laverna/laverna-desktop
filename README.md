<div align="center">
  <h1>Laverna Desktop</h1>
  <p><strong>A <a href="https://laverna.cc">Laverna</a> client packaged in <a href="https://electron.atom.io">Electron</a>.</strong><p>

  <a href="https://travis-ci.org/Laverna/laverna-desktop"><img src="https://travis-ci.org/Laverna/laverna-desktop.svg?branch=dev" alt="Build Status" /></a>

</div>

### Development Requirements
* [FPM](https://github.com/jordansissel/fpm) to make Linux packages
* [Nodejs](https://nodejs.org/en/)

### Development
1. Clone the repository (`git clone https://github.com/Laverna/laverna-desktop`)
2. Run `npm run setup` to install NPM dependencies and [Laverna core](https://github.com/Laverna/laverna)
3. Run `npm start` or `npm run debug` if you want to debug the app

### Creating Electron Packages
To build electron packages for all platforms (Windows, Linux, Mac), run:

```bash
npm run build
```

### Creating Linux Packages
To create installation packages for Linux, run:

```bash
npm run linux
```
