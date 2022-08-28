const express = require("express")
const session = require('express-session');
const path = require('path')
const fs = require('fs')
const bodyParser = require("body-parser")


class Panel {
  constructor(params) {
    this.params = params;
    

    console.log("\x1b[32m%s\x1b[0m", "Initializing @akarui/aoi.panel.")

    if (!params.bot) {
      console.log("\x1b[31m%s\x1b[0m", "[@akarui/aoi.panel] Aoi.js client was not provided. Exiting Code...")
      process.exit(0)
    }
    if (!params.commands) {
      console.log("\x1b[33m%s\x1b[0m", "[@akarui/aoi.panel] Commands folder was not provided. You will not be able to access the commands editor...")
    }
    if (!params.interaction) {
      console.log("\x1b[33m%s\x1b[0m", "[@akarui/aoi.panel] Interaction commands folder was not provided. You will not be able to access the interaction commands editor...")
    }
    if (!params.port) {
      console.log("\x1b[33m%s\x1b[0m", "[@akarui/aoi.panel] A port was not provided. Taking default as 3000.")
      params.port = 3000
    }
    if (!params.username) {
      console.log("\x1b[31m%s\x1b[0m", "[@akarui/aoi.panel] Username was not provided. Exiting Code...")
      process.exit(0)
    }
    if (!params.password) {
      console.log("\x1b[31m%s\x1b[0m", "[@akarui/aoi.panel] Password was not provided. Exiting Code...")
      process.exit(0)
    }
    if (!params.secret) {
      console.log("\x1b[31m%s\x1b[0m", "[@akarui/aoi.panel] Session secret (secret) was not provided. Exiting Code...")
      process.exit(0)
    }
    if (!params.mainFile) {
      const content = fs.readFileSync(path.join(process.cwd(), "package.json"));
      const str = content.toString();
      const json = JSON.parse(str);
      const file = json.main;
      console.log("\x1b[33m%s\x1b[0m", "[@akarui/aoi.panel] Main file name (mainFile) was not provided. Taking main file as " + file)
      params.mainFile = file;

    }
    if (Array.isArray(params.username) === true && Array.isArray(params.password)) {
      if (params.username.length !== params.password.length) {
        console.log("\x1b[31m%s\x1b[0m", "[@akarui/aoi.panel] The number of passwords provided is not equal to the number of usernames. Exiting code...")
        process.exit(0)
      }
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

    require("./frameworkmain.js")(app, params)
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
  isLoggedIn(req, res, next) {
    const params = this.params;
    
    if (Array.isArray(params.username) === true && Array.isArray(params.password)) {
      for (let i = 0; i < params.username.length; i++) {
        if (req.session.uname === params.username[i] && req.session.pswd === params.password[i]) {
          return true;
        }
        else if ((i + 1) === params.username.length) {
          return false;
        }

      }

    }
    else if (req.session.pswd === params.password && req.session.uname === params.username) {
      return true;
    }
    else {
      return false;
    }
  }
}


module.exports = {
  Panel
}
