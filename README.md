# @akarui/aoi.panel
## Developer panel for Aoi.js.
### Work in progress
```js
const { Panel } = require("@akarui/aoi.panel")

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
  port:3000,//port on which website is hosted, Not required! Default 3000
  bot:bot,//your aoi.js client
  mainFile:"index.js",//Main file where code is running.Not required, default taken from package.json
  commands:"commands"// folders in which all the edit needing files are there.
})
panel.loadPanel()

```
