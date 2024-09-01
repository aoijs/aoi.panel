const bodyParser = require('body-parser');
const { AoiError } = require("aoi.js");

const c_version = require('../package.json').version;
const { PanelLogs } = require("./panelLogs.js");
const {
  checkAccounts,
  checkVersion,
  checkPackage,
  checkAuth,
  checkPanel,
  getAllDirs
} = require("./utilFuncs.js");
const api = require('./api/api.js');
const gui = require("./gui/gui.js");



class Panel {
  #options;

  constructor(options) {
    this.#options = this.#resolveOptions(options);

    checkVersion();
    checkPackage();

    this.logs = new PanelLogs(this.#options);

    this.#initCommands();

    setTimeout(() => {
      checkPanel(this);
    }, 10000);
  }

  // TODO: Rename it to "options" when replace all panel "params" calls
  get params() {
    return this.#options;
  }

  #resolveOptions(options) {
    if (!options.client) throw new Error("Please provide a valid aoi.js client");
    if (!options.port) throw new Error("Please provide a valid port");
    if (!options.accounts) throw new Error("Please provide a valid accounts file path");

    this.accounts = require(process.cwd() + options.accounts);
    checkAccounts(this.accounts);

    AoiError.createConsoleMessage(
    [
        {
          text: `Installed version: ${c_version}`,
          textColor: "green",
      },
        {
          text: `Accounts Made for aoi.panel: ${this.accounts.length}`,
          textColor: "blue",
      },
    ],
      "white",
      {
        text: "@aoijs/aoi.panel ",
        textColor: "cyan",
      }
    );

    return options;
  }

  #initCommands() {
    const client = this.#options.client;
    client.awaitedCommand({
      name: "panelawaitedcommand",
      code: `$cacheMembers[$guildID;false]$suppressErrors`
    });

    client.readyCommand({
      channel: "$randomChannelID",
      code: `$forEachGuild[1s;{};panelawaitedcommand;]$suppressErrors`
    });
  }

  loadPanel() {
    this.app = this.#initApp();
    this.app.listen(this.#options.port, () =>
      AoiError.createConsoleMessage(
          [], "green", {
          text: "panel running on port " + this.#options.port,
          textColor: "white"
        }
      )
    );

    api.loadAPI(this, this.#options, checkAuth);
    gui.loadGUI(this, this.#options);
  }

  #initApp() {
    const app = require("express")();
    const thirtyDays = 1000 * 60 * 60 * 24 * 30;

    app.use(require("express").json())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())
    app.use(require("express-session")({
      secret: require('crypto').randomBytes(16).toString("hex"),
      cookie: { maxAge: thirtyDays },
      resave: true,
      saveUninitialized: true
    }))

    return app;
  }
};

module.exports = {
  Panel
};