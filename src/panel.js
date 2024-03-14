const util = require("./utilFuncs.js");
const {AoiError} = require("aoi.js");

class Panel {
    constructor(params) {
        this.params = params;

        util.checkVersion();
        util.checkPackage();

        if (!params.client) {
            throw new TypeError("Client was not provided!")
        }
        if (!params.port) {
            throw new TypeError("Port was not provided!")
        }
    }

    loadAPI(data) {
        if (!data.auth) {
            throw new TypeError("Authentication key was not provided!")
        }
        this.auth = data.auth;
        const app = require("express")();
        app.listen(this.params.port)
        this.app = app;
        const f = require("./api/index.js");
        f.loadAPIRoutes(this);
    }

    loadGUI(data) {
        const params = this.params;
        if (!this.app) {
            throw new TypeError("API was not loaded! Please load the API before loading the GUI!")
        }
        if (!data.username) {
            throw new TypeError("Username(s) was not provided!")
        }
        if (!data.password) {
            throw new TypeError("Password(s) was not provided!")
        }
        if (Array.isArray(data.password) === true && Array.isArray(data.username) === false || Array.isArray(data.password) === false && Array.isArray(data.username) === true) {
            throw new TypeError("Username and Passwords must be both an array or both a string!")
        }
        if (Array.isArray(data.password) && Array.isArray(data.username)) {
            if (data.password.length !== data.username.length) {
                throw new TypeError("Username and Passwords Array length must match!");
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
            if (Array.isArray(data.username)) {
                for (let i = 0; i < data.username.length; i++) {
                    if (req.session.username === data.username[i] && req.session.password === data.password[i]) {
                        return res.sendFile(__dirname + "/views/index2.html");
                    }
                }
                return res.sendFile(__dirname + "/views/index.html");
            } else {
                if (req.session.username === data.username && req.session.password === data.password) {
                    return res.sendFile(__dirname + "/views/index2.html");
                }
                return res.sendFile(__dirname + "/views/index.html");
            }

        })
        AoiError.createCustomBoxedMessage(
            [
                {
                    text: `Successfully connected Panel on port ${params.port}`,
                    textColor: "green",
                },
                {
                    text: `good development !!!😊`,
                   
                },
            ],
            "white",
            { text: "@akarui/aoi.panel v0.0.9", textColor: "cyan" }
        );
    }

    isLoggedIn(req, res) {
        const data = this.data;
        if (Array.isArray(data.username)) {
            for (let i = 0; i < data.username.length; i++) {
                if (req.session.username === data.username[i] && req.session.password === data.password[i]) {
                    return true;
                }
            }
            return false;
        } else {
            return req.session.username === data.username && req.session.password === data.password;

        }
    }
}

module.exports = {
    Panel
}
