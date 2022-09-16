# @akarui/aoi.panel

## A developer panel for aoi.js

## Installation

```bash
npm i @akarui/aoi.panel
```

## Usage
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

## Advanced Usage

### Multiple users

```javascript
const {Panel} = require("@akarui/aoi.panel")

const panel = new Panel({
    username: ["your-username-1","your-username-2","and so on"],
    password: ["password-1","password-2","and so on"],
    secret: require('crypto').randomBytes(16).toString("hex"),
    port: 3000,
    bot: bot,
    mainFile: "index.js",
    commands: "commands"
})
panel.loadPanel()
```

While using multiple users, you need the number of usernames equal to the number of passwords. 

If position of username is one, that user's password position should also be one.

The more the number of username passwords inputted, the longer the panel will take to load, so do not use unless necessary.


### Custom pages with express

```javascript
const app = panel.app;
app.get("/somenewpagename_which_is_not_already_used", async (req,res)=> {
  res.send("<html><head><title>Aoi.panel</title></head><body>Aoi.panel is cool ngl.</body></html>")
})
```

### Checking if user is logged in

```javascript
const app = panel.app;
app.get("/somenewpagename_which_is_not_already_used", (req,res) =>{
  let a = panel.isLoggedIn(req, res);
  if(a==false){
    res.redirect("/")
  }
  else {
    res.send("<html><head><title>Aoi.panel</title></head><body>Aoi.panel is cool ngl.</body></html>")
  }
})
```

This is recommended to be used only by users who have prior knowledge with javascript, html and express. 

We will not be providing support for express / html / custom javascript support. 

## Join our [Support Server](https://aoi.js.org/invite) for support
