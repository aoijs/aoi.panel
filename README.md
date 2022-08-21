# @akarui/aoi.panel
## A developer panel for aoi.js

### Installing:
```
npm i @akarui/aoi.panel@latest
```
or 
```
npm i https://github.com/AkaruiDevelopment/panel#main
```

### Basic Usage:
```js
const {Panel} = require("@akarui/aoi.panel")

const {Bot} = require("aoi.js")

const bot = new Bot({
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
    commands: "commands"// folder name in which all the edit needing files are there.
})
panel.loadPanel()//Load The Panel

panel.onError()//Will detect errors, and send it to aoi.panel's error page.

bot.onMessage() //Will detect messages, and send it to aoi.js core to send messages.
```

### Advanced Usage

1) Multiple users:
```js
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
**Note:** ***While using multiple users, you need the number of usernames equal to the number of passwords. If position of username is one, that user's password position should also be one! The more the number of username passwords inputted, the longer the panel will take to load, so do not use unless necessary!***

2) Custom pages with express:
```js
var app =panel.app;
app.get("/somenewpagename_which_is_not_already_used", async (req,res)=>{
  res.send("<html><head><title>Aoi.panel</title></head><body>Aoi.panel is cool ngl.</body></html>")
})
```
### or 
checking if user is logged in:
```js
var app =panel.app;
app.get("/somenewpagename_which_is_not_already_used", (req,res)=>{
  let a = panel.isLoggedIn(req, res);
  if(a==false){
    res.redirect("/")
  }
  else {
    res.send("<html><head><title>Aoi.panel</title></head><body>Aoi.panel is cool ngl.</body></html>")
  }
})
```
**Note: *This is recommended to be used only by users acquainted with javascript, html and express. We will not be providing support for express/ html /custom javascript help.*** 
## Join our support server for help [here](https://aoi.js.org/invite)
