# @akarui/aoi.panel

## Installation

```bash
npm i @akarui/aoi.panel
```

## Basic Usage:
```javascript
const {Panel} = require("@akarui/aoi.panel")
const {AoiClient} = require("aoi.js")
const bot = new AoiClient({
  token: "Discord Bot Token",
  prefix: "Discord Bot Prefix",
  intents: ["MessageContent", "Guilds", "GuildMessages"],
  events: ["onMessage"]
});
const panel = new Panel({
    username: "your-username",//username for logging in
    password: "password-here",//password for logging in
    secret: require('crypto').randomBytes(16).toString("hex"),//session secret
    port: 3000,//port on which website is hosted, Not required! Default 3000
    bot: bot,//your aoi.js client
    mainFile: "index.js",//Main file where code is running.Not required, default taken from package.json
    commands: "./commands",// folder name in which all the edit needing files are there.
    interaction:"./interactions"//interactions folder
})
panel.loadPanel()//Load The Panel
panel.onError()//Will detect errors, and send it to aoi.panel's error page.
```
## We also support aoi.js v6 and discord.js v13.

## View the full documentation [here](https://github.com/AkaruiDevelopment/panel/tree/aoiv6/documentation/README.md)

## Join our [Support Server](https://aoi.js.org/invite) for support
