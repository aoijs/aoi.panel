const { AoiClient, LoadCommands } = require("aoi.js");

const bot = new AoiClient({
    token: "YOUR TOKEN HERE",
    prefix: "b!",
    intents: ["Guilds", "GuildMessages", "MessageContent","GuildMembers"],
    events: ["onMessage", "onInteractionCreate"]
});
/*
const loader = new LoadCommands(bot);
loader.load(bot.cmd, "./commands/");
*/


const { Panel }=require("./src/index.js");

const panel = new Panel({
  port:3000,//port
  client:bot,//aoi.js client
  accounts : "/panel.userconfig.js"
})

panel.loadPanel();

