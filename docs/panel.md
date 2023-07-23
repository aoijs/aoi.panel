# The Panel Class

# The Panel Class

```javascript
const {Panel} = require("@akarui/aoi.panel")

const panel = new Panel({
  //params here...
});
```

## Parameters

| Name | Description | type | required| Example |
| -------- | -------- | -------- | -------- | -------- |
| `port` | Port on which the panel is hosted. | integer | `false`. Default: `3000` | `8000`
| `client` | Your aoi.js or discord.js client. | object | `true` | `bot`

## Functions
1. `loadAPI` : Will load the api of panel. If this function is not called, aoi.panel will not work. Read more about the API [here](https://github.com/AkaruiDevelopment/aoi.panel/tree/v0.0.5/docs/api.md)

### Parameters

| Name | Description | type | required| Example |
| -------- | -------- | -------- | -------- | -------- |
| `auth` | API authentication key | String | `true` | `someKeyWithoutSpacesAndSpecialChars` |

The auth key must be stored in `env` and it must not fall in wrong/untrustworthy hands. (Leaking of this key could be as fatal as leaking of your discord bot token!)

### Example
```js
panel.loadAPI({
  auth:"MyReallyLongAPIauthKeySoNoOneCanHackMyBot"
})
```

2. `loadGUI` : Will load GUI of panel. This is optional and if you want to design your own GUI with the help of [aoi.panel API](https://github.com/AkaruiDevelopment/aoi.panel/tree/v0.0.5/docs/api.md), you do not need to call this function.

| Name | Description | type | required| Example |
| -------- | -------- | -------- | -------- | -------- |
| `username` | Username to login to panel | String \| string array | `true` | `Bumblebee-3` or `["Bumblebee-3","Leref","Ayaka"]` |
| `password` | Password to login to panel | String \| string array | `true` | `Bumblebee-3` or `["NeverGonnGiveYouUp<3","stillFerel","UserSatoshiGuy2023"]` |

The login credentials must be stored in `env` and it must not fall in wrong/untrustworthy hands. (Leaking of credentials could be as fatal as leaking of your discord bot token!)

# Advanced features
## Making your own pages
Panel was built with express.js, and if you want to add/make your own ui, you could access the express.js app by:
```js
const app = panel.app;
app.get("/somePathWhichDoesNotExist",(req,res)=>{
  res.send("Aoi.panel is sooo cool");
})
```
### Checking if user is logged in:
```js
const app = panel.app;
app.get("/somePathWhichDoesNotExist",(req,res)=>{
  var check = panel.isLoggedIn(req,res);
  if(a==true){res.send("Logged in")}
  else{res.send("Not logged in")}
})
```
