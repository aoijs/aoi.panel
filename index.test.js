const { Panel } = require("./index.js")

const { Bot } = require("aoi.js")

const bot = new Bot({
  token:process.env.token,
  prefix:"!",
  intents:"all"
})

const panel = new Panel({
  username:"NeverGonnaGiveYouUp",//username for logging in
  password:"helloDarknessMyOldFriend",//password for logging in
  secret:"AoijsOP",//session secret
  port:3000,//port on which website is hosted
  bot:bot//your aoi.js client
})
panel.loadPanel()

bot.onMessage()
bot.command({
  name:"hi",
  code:`lol`
})