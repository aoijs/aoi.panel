const { Panel } = require("./index.js")

const { Bot } = require("aoi.js")

const bot = new Bot({
  token:process.env.token,
  prefix:"!",
  intents:"all"
})

const panel = new Panel({
  username:process.env.uname,//username for logging in
  password:process.env.pass,//password for logging in
  secret:process.env.secret,//session secret
  port:3000,//port on which website is hosted
  bot:bot,//your aoi.js client
  mainFile:"index.test.js"
})
panel.loadPanel()

bot.onMessage()
bot.command({
  name:"hi",
  code:`lol`
})
