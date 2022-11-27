const { AoiClient } = require("aoi.js");
const { Panel } = require("@akarui/aoi.panel")


const bot = new AoiClient({
  token: process.env.token,
  intents: ["Guilds", "GuildMessages", "MessageContent"],
  prefix: "n!"
})

bot.addEvent("onMessage")

bot.commands.add("basicCommand", {
  name: "ping",
  code: `Pong! $pingms`
})

bot.start()

bot.status.add({
  name: "with Blurr",
  presence: "online",
  type: "PLAYING",
  duration: 12000
})


bot.commands.load("./commands/")

const panel = new Panel({
  username: process.env["uname"],//username for logging in
  password: process.env["pass"],//password for logging in
  secret: require('crypto').randomBytes(16).toString("hex"),//session secret
  port: 3000,//port on which website is hosted, Not required! Default 3000
  bot: bot,//your aoi.js client
  mainFile: "index.js",//Main file where code is running.Not required, default taken from package.json
  commands: "./commands",// folder name in which all the edit needing files are there.
  //interaction:"./interactions",//interactions folder
  version: "v7"
})
panel.loadPanel()//Load The Panel

panel.onError()//Will detect errors, and send it to aoi.panel's error page.