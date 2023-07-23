const { AoiClient, LoadCommands } = require("aoi.js");
const { Panel }=require("./src/index.js");

const bot = new AoiClient({
    token: "your super secret token goes here",
    prefix: "prefix here",
    intents: ["Guilds", "GuildMessages", "MessageContent"],
    events: ["onMessage", "onInteractionCreate"]
});

const loader = new LoadCommands(bot);
loader.load(bot.cmd, "./commands/");

const panel = new Panel({
  port:3000,//port
  client:bot//aoi.js client
})

panel.loadAPI({
  auth:"randomauthkey"//no spaces, keep it only alphanumeric...
})

panel.loadGUI({
  username:["Bumblebee-3"],
  password:["SomePasswordHere"]
})
