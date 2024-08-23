// Importing the necessary modules
const { AoiClient, LoadCommands } = require("aoi.js");

// Creating a new instance of AoiClient
const bot = new AoiClient({
    // Setting the Discord bot token
    token: "YOUR_SUPER_SECRET_TOKEN_HERE",
    // Setting the bot's prefix
    prefix: "YOUR_BOT_PREFIX",
    // Setting the intents for the bot
    intents: ["Guilds", "GuildMessages", "MessageContent","GuildMembers"],
    // Setting the events to be listened to by the bot
    events: ["onMessage", "onInteractionCreate"]
});

/*
// Uncomment the following lines if you want to load commands from the "./commands/" directory
const loader = new LoadCommands(bot);
loader.load(bot.cmd, "./commands/");
*/

// Importing the Panel class from the "./src/index.js" file

const { Panel }=require("./src/index.js");

// Creating a new instance of Panel
const panel = new Panel({
  port:3000,// Setting the port number for the panel
  client:bot,//aoi.js client
  accounts : "/panel.userconfig.js"// Setting the path to the accounts file
})

// Loading the panel
panel.loadPanel();

