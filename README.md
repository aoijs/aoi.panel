<p align="center">
  <a href="https://aoi.js.org">
    <img width="150" src="https://github.com/aoijs/website/blob/master/assets/images/aoipanel.png?raw=true" alt="aoi.panel">
  </a>
</p>

<h1 align="center">@akarui/aoi.panel</h1>

![npm](https://img.shields.io/npm/dt/@akarui/aoi.panel?color=blue&label=NPM%20Downloads&logo=npm&logoColor=Green)
![GitHub](https://img.shields.io/github/license/AkaruiDevelopment/panel?color=blue&logo=github)
![GitHub package.json version](https://img.shields.io/github/package-json/v/AkaruiDevelopment/panel?color=blue&label=Git%20Version)
![GitHub last commit](https://img.shields.io/github/last-commit/AkaruiDevelopment/panel?color=blue)
![GitHub repo size](https://img.shields.io/github/repo-size/AkaruiDevelopment/panel)
![GitHub forks](https://img.shields.io/github/forks/AkaruiDevelopment/panel?color=blue&style=social)
![GitHub Repo stars](https://img.shields.io/github/stars/AkaruiDevelopment/panel?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/AkaruiDevelopment/panel?style=social)

### Table of Contents

- [Installation](#installation)
    - [Setup](#setup)
- [Adding Multiple Users](#adding-multiple-users)
- [Making Custom Pages](#making-custom-pages)

### Installation

```bash
npm i @akarui/aoi.panel
```

### Setup

```javascript
const {Panel} = require("@akarui/aoi.panel")
const {AoiClient} = require("aoi.js");

const client = new AoiClient({
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage", "onInteractionCreate"],
    prefix: "Discord Bot Prefix",
    token: "Discord Bot Token",
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here",
    }
});


client.loadCommands("./commands/", true);

const panel = new Panel({
    port: 3000,
    client: client
})

panel.loadAPI({
    auth: "Authentication-Key"//No spaces, keep it only alphanumeric.
})

panel.loadGUI({
    username: ["username 1"],
    password: ["Password 1"],
})
```

### Adding Multiple Users

```javascript
panel.loadGUI({
    username: ["username 1", "username 2", "username 3"],
    password: ["Password 1", "Password 2", "Password 3"],
})
```

### Making Custom Pages

```javascript
const app = panel.app;
app.get("/example", (req, res) => {
    res.send("This is an example page.");
})
```

