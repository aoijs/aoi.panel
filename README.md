# @akarui/aoi.panel

## Akarui's Official Developer Panel for [aoi.js](https://aoi.js.org) 

## Installation

```bash
npm i @akarui/aoi.panel
```

## Basic Usage:
```javascript
const {Panel} = require("@akarui/aoi.panel")

const {AoiClient} = require("aoi.js")

const bot = new AoiClient({
    token: "DISCORD BOT TOKEN",
    prefix: "DISCORD BOT PREFIX",
    intents: ["GUILDS", "GUILD_MESSAGES"]
})

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

bot.onMessage() //Will detect messages, and send it to aoi.js core to send messages.
```
## We also support aoi.js v6 and discord.js v13.

## View the full documentation [here](https://github.com/AkaruiDevelopment/panel/tree/aoiv6/documentation/index.md)

## Join our [Support Server](https://aoi.js.org/invite) for support
