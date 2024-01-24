const path = require('path')
const fs = require('fs')
const util = require("./utilFuncs.js");

class Panel {
    constructor(params) {
        this.params = params;

        util.checkVersion();
        util.checkPackage();

        console.log("\x1b[32m%s\x1b[0m", "Initializing @akarui/aoi.panel.")
        if (!params.port) {
            console.log("\x1b[33m%s\x1b[0m", "[@akarui/aoi.panel] A port was not provided. Taking default as 3000.")
            params.port = 3000;
        }
        if (!params.client) {
            console.log("\x1b[33m%s\x1b[0m", "[@akarui/aoi.panel] Aoi.js client was not provided. Exiting code.")
            process.exit(0)
        }
    }

    loadAPI(data) {
        if (!data.auth) {
            console.log("\x1b[33m%s\x1b[0m", "[@akarui/aoi.panel] A auth key for API was not provided. Exiting code.")
            process.exit(0)
        }
        this.auth = data.auth;
        const app = require("express")();
        app.listen(this.params.port)
        this.app = app;
        console.log("\x1b[32m%s\x1b[0m", "aoi.js Panel API ready on port: " + this.params.port)
        const f = require("./api/index.js");
        f.loadAPIRoutes(this);
    }

    loadGUI(data) {
        const params = this.params;
        if (!this.app) {
            console.log("You need to run the function loadAPI() before you run loadGUI()")
            process.exit(0)
        }
        if (!data.username) {
            console.log("Username(s) was not provided!");
            process.exit(0);
        }
        if (!data.password) {
            console.log("Password(s) was not provided!");
            process.exit(0);
        }
        if (Array.isArray(data.password) == true && Array.isArray(data.username) == false || Array.isArray(data.password) == false && Array.isArray(data.username) == true) {
            console.log("Username and Passwords should both be arrays!");
            process.exit(0);
        }
        if (Array.isArray(data.password) && Array.isArray(data.username)) {
            if (data.password.length != data.username.length) {
                console.log("Username and Passwords Array length must match!");
                process.exit(0);
            }
        }
        this.data = data;
        const thirtyDays = 1000 * 60 * 60 * 24 * 30;

        let app = this.app;
        app.use(require("express").json())    // <==== parse request body as JSON
        const bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json())


        app.use(require("express-session")({
            secret: require('crypto').randomBytes(16).toString("hex"),
            cookie: {maxAge: thirtyDays},
            resave: true,
            saveUninitialized: true
        }))
        const fs = require("fs");
        fs.readdirSync(__dirname + "/assets/").forEach(file => {
            app.get("/assets/" + file, function (req, res) {
                res.sendFile(__dirname + "/assets/" + file)
            })
        })
        fs.readdirSync(__dirname + "/css/").forEach(file => {
            app.get("/css/" + file, function (req, res) {
                res.sendFile(__dirname + "/css/" + file)
            })
        })
        fs.readdirSync(__dirname + "/js/").forEach(file => {
            app.get("/js/" + file, function (req, res) {
                res.sendFile(__dirname + "/js/" + file)
            })
        })
        require("./gui/frameworkmain.js")(data, this.params, app, this);
        app.set('view engine', 'html');
        app.set('views', __dirname + "/pages");
        app.get("/", function (req, res) {
            //if(!req.session) return res.sendFile(__dirname+"/views/index.html");
            if (Array.isArray(data.username)) {
                for (let i = 0; i < data.username.length; i++) {
                    if (req.session.username == data.username[i] && req.session.password == data.password[i]) {
                        return res.sendFile(__dirname + "/views/index2.html");
                    }
                }
                return res.sendFile(__dirname + "/views/index.html");
            } else {
                if (req.session.username == data.username && req.session.password == data.password) {
                    return res.sendFile(__dirname + "/views/index2.html");
                }
                return res.sendFile(__dirname + "/views/index.html");
            }

        })

        console.log("\x1b[32m%s\x1b[0m", "aoi.js Panel GUI ready on port: " + params.port)
    }

    isLoggedIn(req, res) {
        const data = this.data;
        if (Array.isArray(data.username)) {
            for (let i = 0; i < data.username.length; i++) {
                if (req.session.username == data.username[i] && req.session.password == data.password[i]) {
                    return true;
                }
            }
            return false;
        } else {
            if (req.session.username == data.username && req.session.password == data.password) {
                return true;
            }
            return false;
        }
    }
}


module.exports = {
    Panel
}
