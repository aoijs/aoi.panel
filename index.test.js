const { Panel } = require("./index.js")

const { Bot } = require("aoi.js")

const bot = new Bot({
  token: process.env.token,
  prefix: "!",
  intents: "all"
})
const panel = new Panel({
  username: process.env.uname,
  password: process.env.pass,
  secret: process.env.secret,
  port: 3000,
  bot: bot,
  mainFile: "index.test.js",
  commands: "commands"
})
/**/
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