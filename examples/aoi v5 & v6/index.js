const { Panel } = require("@akarui/aoi.panel")

const { AoiClient } = require("aoi.js")

const bot = new AoiClient({
  token: "DISCORD BOT TOKEN",
  prefix: "DISCORD BOT PREFIX",
  intents: ["GUILDS", "GUILD_MESSAGES"]
})/* NOTE THIS IS V5 USAGE */

const panel = new Panel({
  username: "your-username",//username for logging in
  password: "password-here",//password for logging in
  secret: require('crypto').randomBytes(16).toString("hex"),//session secret
  port: 3000,//port on which website is hosted, Not required! Default 3000
  bot: bot,//your aoi.js client
  mainFile: "index.js",//Main file where code is running.Not required, default taken from package.json
  commands: "./commands",// folder name in which all the edit needing files are there.
  //interaction:"./interactions"//interactions folder
  version: "v5" || "v6"
})
panel.loadPanel()//Load The Panel

panel.onError()//Will detect errors, and send it to aoi.panel's error page.

bot.onMessage() //Will detect messages, and send it to aoi.js core to send messages.
