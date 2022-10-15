
# Advanced Usage

## Multiple users login

```javascript
const {Panel} = require("@akarui/aoi.panel")

const panel = new Panel({
    username: ["your-username-1","your-username-2","and so on"],
    password: ["password-1","password-2","and so on"],
    secret: require('crypto').randomBytes(16).toString("hex"),
    port: 3000,
    bot: bot,
    mainFile: "index.js",
    commands: "commands"
})
panel.loadPanel()
```

While using multiple users, you need the number of usernames equal to the number of passwords. 

If position of username is one, that user's password position should also be one.

The more the number of username passwords inputted, the longer the panel will take to load, so do not use unless necessary.


## Custom pages with express

```javascript
const app = panel.app;
app.get("/somenewpagename_which_is_not_already_used", async (req,res)=> {
  res.send("<html><head><title>Aoi.panel</title></head><body>Aoi.panel is cool ngl.</body></html>")
})
```

### Checking if user is logged in

```javascript
const app = panel.app;
app.get("/somenewpagename_which_is_not_already_used", (req,res) =>{
  let a = panel.isLoggedIn(req, res);
  if(a==false){
    res.redirect("/")
  }
  else {
    res.send("<html><head><title>Aoi.panel</title></head><body>Aoi.panel is cool ngl.</body></html>")
  }
})
```

This is recommended to be used only by users who have prior knowledge with javascript, html and express. 

We will not be providing support for express / html / custom javascript support.