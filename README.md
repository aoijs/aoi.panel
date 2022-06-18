# @akarui/Panel
## Developer panel for Aoi.js.
### Work in progress
```js
const { Panel } = require("@akarui/panel")

const { Bot } = require("aoi.js")

const bot = new Bot({
  token:process.env.token,
  prefix:"!",
  intents:"all"
})

const panel = new Panel({
  username:"NeverGonnaGiveYouUp",//username for logging in
  password:"helloDarknessMyOldFriend",//password for logging in
  secret:"lol god",//session secret
  port:3000,//port on which website is hosted
  bot:bot//your aoi.js client
})
panel.loadPanel()

```