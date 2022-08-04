const { Panel } = require("./index.js")

const { Bot } = require("aoi.js")

const bot = new Bot({
  token: process.env.token,
  prefix: "!",
  intents: "all"
})
const panel = new Panel({
  username: process.env.uname,//username for logging in
  password: process.env.pass,//password for logging in
  secret: process.env.secret,//session secret
  port: 3000,//port on which website is hosted,not required!
  bot: bot,//your aoi.js client
  mainFile: "index.test.js",//main file, not required!
  commands: "commands"//Commands Folder
})
panel.loadPanel()
var app=panel.app;

bot.onMessage()
bot.command({
  name: "hi",
  code: `lol`
})

var aoi =require("aoi.js");
const loader = new aoi.LoadCommands(bot)
loader.load(bot.cmd,"./commands/")

bot.command({
name: "map",
code: `$map[hi/hello/bye/goodbye;/;mapCmd;,]`
})

bot.awaitedCommand({
name: "mapCmd",
code: `Values: {value}`
})