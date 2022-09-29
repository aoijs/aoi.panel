# How To Use Aoi.Panel with Discord.js:
```js
const { Client, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: 32767
});

client.login("ABCDEFGHIJK");


const {Panel} = require("@akarui/aoi.panel")

const panel = new Panel({
  username: process.env.uname,
  password: process.env.pass,
  secret: require('crypto').randomBytes(16).toString("hex"),
  port: 3000,
  bot: client,
  commands: "commands",
  mainFile: "./index.test.js",
  //interaction: "./interaction",
  type: "djs",
  //subDriectory:"/adminpanel"
})
  
panel.loadPanel()//Load The Panel

panel.onError()//Will detect errors, and send it to aoi.panel's error page.
```

And Of couse, Your command handler code.