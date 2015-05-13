[![Stories in Ready](https://badge.waffle.io/determinedwaffle/pickup.png?label=ready&title=Ready)](https://waffle.io/determinedwaffle/pickup)
# pickup

YO! This app was scaffolded out using [this Yeoman generator](https://github.com/diegonetto/generator-ionic).

## Initial setup

### Client
Follow these steps to get the mobile app to run in your emulator:

1. Clone down your fork of the repo
1. Run `npm install`
1. Run `bower install`
1. Run `npm install -g cordova ionic`
1. Run `npm -g install ios-sim`
1. Run `gem update --system`
1. Run `gem install compass`
1. Run `grunt build:ios --device --release`
1. Run `grunt platform:add:ios`
1. Run `grunt build:ios --device --release` AGAIN (don't ask me why)
1. Run `grunt emulate:ios --livereload`

If during the grunt pocesses you get this error: "Error: Hook failed with error code 127", then go follow the instructions on [this site to fix it](http://forum.ionicframework.com/t/error-hook-failed-with-error-code-127/12236) (may require fixes to multiple files).

### Server

Follow these steps:

1. Make sure you have MySql installed. If not, run `brew install mysql`
2. Start your MySql server with `mysql.server start`
3. Log into your mysql instance with `mysql -u root -p` and leave the password blank.
4. Run `CREATE DATABASE pickupDB;` inside mysql.
5. Exit MySql.
2. Go back into the project folder then do `cd server`
3. Run `nodemon server.js`
