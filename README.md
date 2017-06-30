Laverna Desktop
===============
A [Laverna](https://laverna.cc) client packaged in [Electron](https://electron.atom.io).

### Development Requirements
* [FPM](https://github.com/jordansissel/fpm) to make Linux packages
* [Nodejs](https://nodejs.org/en/)

### Development
1. Clone the repository
2. Clone https://github.com/Laverna/laverna and build the app
3. Copy laverna/dist directory to app/dist
4. Run `npm install`
5. Run `npm start` or `npm run debug` if you want to debug the app

### Creating Electron Packages
To build electron packages for all platforms, run:

```bash
npm run build
```

### Creating Linux Packages
To create installation packages for Linux, run:

```bash
npm run linux
```
