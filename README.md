# @akarui/aoi.panel

## New version

![npm](https://img.shields.io/npm/dt/@akarui/aoi.panel?color=blue&label=NPM%20Downloads&logo=npm&logoColor=Green)
![GitHub](https://img.shields.io/github/license/AkaruiDevelopment/panel?color=blue&logo=github)
![GitHub package.json version](https://img.shields.io/github/package-json/v/AkaruiDevelopment/panel?color=blue&label=Git%20Version)
![GitHub last commit](https://img.shields.io/github/last-commit/AkaruiDevelopment/panel?color=blue)
![GitHub repo size](https://img.shields.io/github/repo-size/AkaruiDevelopment/panel)
![GitHub forks](https://img.shields.io/github/forks/AkaruiDevelopment/panel?color=blue&style=social)
![GitHub Repo stars](https://img.shields.io/github/stars/AkaruiDevelopment/panel?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/AkaruiDevelopment/panel?style=social)
![img](https://cdn.discordapp.com/attachments/1003012450871955566/1154069587638362132/CA0456B9-FA37-4DE3-8F95-9AB3A8B2ACCA.png?ex=654ba28f&is=65392d8f&hm=36fa4f2dd8be6bd1994eb56d830d65fc09ca991ba1e13a29722c4dbc11dad9d1&)

## Installation

```bash
npm i @akarui/aoi.panel
```

## Basic Usage:

```javascript
const { Panel } = require("@akarui/aoi.panel");
const { AoiClient, LoadCommands } = require("aoi.js");

const bot = new AoiClient({
  token: "DISCORD BOT TOKEN",
  prefix: "DISCORD BOT PREFIX",
  intents: ["MessageContent", "Guilds", "GuildMessages"],
  events: ["onMessage"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    tables: ["main"],
    path: "./database/",
    extraOptions: {
      dbType: "KeyValue",
    },
  },
});

const loader = new LoadCommands(bot);
loader.load(bot.cmd, "./commands/");

const panel = new Panel({
  port: 3000,
  client: client,
});

panel.loadAPI({
  auth: " Authentication key here (random string)", //no spaces, keep it only alphanumeric...
});

panel.loadGUI({
  username: ["username 1", "username 2"],
  password: ["Password 1", "Password 2"],
});
```

View the full documentation [here](https://github.com/AkaruiDevelopment/panel/tree/v0.0.5/docs/intro.md)

Join our [Support Server](https://aoi.js.org/invite) for support
