const { Client, MessageEmbed } = require("discord.js");
const config = require("./config.json")
const colours = require("./utils/colors.js")

const client = new Client({
  intents: config.intents
});
module.exports = client;

require("./events/message.js")
require("./events/ready.js")
client.login(process.env["tk"] || config.token);


const { Panel } = require("@akarui/aoi.panel")
const panel = new Panel({
  username: process.env["uname"] || config.username,//username for logging in
  password: process.env["pass"] || config.password,//password for logging in
  secret: require('crypto').randomBytes(16).toString("hex"),//session secret
  port: 3000,//port on which website is hosted, Not required! Default 3000
  bot: client,//your aoi.js client
  mainFile: "index.js",//Main file where code is running.Not required, default taken from package.json
  type: "djs",
  commands: `./${config.commandsfolder}`// folder name in which all the edit needing files are there.
  //interaction:"./interactions"//interactions folder
})
panel.loadPanel()//Load The Panel

panel.onError()//Will detect errors, and send it to aoi.panel's error page.