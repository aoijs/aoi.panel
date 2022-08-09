const express = require("express")
const session = require('express-session');
const path = require('path')
const fs = require('fs')
const bodyParser = require("body-parser")



class Panel {
  constructor(params) {
    this.params = params;

    console.log("\x1b[32m%s\x1b[0m", "Initializing aoi.js Panel.")

    if (!params.bot) {
      console.log("\x1b[31m%s\x1b[0m", "Aoi.js client was not provided. Exiting Code...")
      process.exit(0)
    }
    if (!params.commands) {
      console.log("\x1b[31m%s\x1b[0m", "Commands folder was not provided. Exiting Code...")
      process.exit(0)
    }
    if (!params.port) {
      console.log("\x1b[33m%s\x1b[0m", "A port was not provided. Taking default as 3000.")
      params.port = 3000
    }
    if (!params.username) {
      console.log("\x1b[31m%s\x1b[0m", "Username was not provided. Exiting Code...")
      process.exit(0)
    }
    if (!params.password) {
      console.log("\x1b[31m%s\x1b[0m", "Password was not provided. Exiting Code...")
      process.exit(0)
    }
    if (!params.secret) {
      console.log("\x1b[31m%s\x1b[0m", "Session secret (secret) was not provided. Exiting Code...")
      process.exit(0)
    }
    if (!params.mainFile) {
      const content = fs.readFileSync(path.join(process.cwd(), "package.json"));
      const str = content.toString();
      const json = JSON.parse(str);
      const file = json.main;
      console.log("\x1b[33m%s\x1b[0m", "Main file name (mainFile) was not provided. Taking main file as " + file)
      params.mainFile = file;

    }

  }
  loadPanel() {
    const params = this.params;

    //console.log(params)
    const thirtyDays = 1000 * 60 * 60 * 24 * 30;

    const app = express()
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({
      secret: params.secret,
      cookie: { maxAge: thirtyDays },
      resave: true,
      saveUninitialized: true
    }))

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname);

    app.listen(params.port)

    require("./framework.js")(app, params)
    console.log("\x1b[32m%s\x1b[0m", "aoi.js Panel ready on port: " + params.port)
    
    this.app = app;
  }
  onError() {
    function random(length) {
      let result = '';
      const characters = 'abcdefghijklmnopqrstuvwxyz-_abcdefghijklmnopqrstuvwxyz';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      return result;
    }
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection/Catch');
      console.log(reason, p);
      fs.writeFileSync(path.join(__dirname, "/errors/" + random(8) + ".txt"), "Error: Unhandled Rejection/Catch \n\n" + reason + " \n\n" + p);
    });
    process.on("uncaughtException", (err, origin) => {
      console.log('Uncaught Exception/Catch');
      console.log(err, origin);
      fs.writeFileSync(path.join(__dirname, "/errors/" + random(8) + ".txt"), "Error: Uncaught Exception/Catch \n\n" + err + " \n\n" + origin);
    });
    process.on('uncaughtExceptionMonitor', (err, origin) => {
      console.log('Uncaught Exception/Catch ');
      console.log(err, origin);
      fs.writeFileSync(path.join(__dirname, "/errors/" + random(8) + ".txt"), "Error: Uncaught Exception/Catch \n\n" + err + " \n\n" + origin);

    });
    process.on('multipleResolves', (type, promise, reason) => {
      console.log('Multiple Resolves');
      console.log(reason, promise)
      fs.writeFileSync(path.join(__dirname, "/errors/" + random(8) + ".txt"), "Error: Uncaught Exception/Catch \n\n" + reason + " \n\n" + promise);
    });




  }
}


module.exports = {
  Panel
}
