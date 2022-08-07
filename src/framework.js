const fs = require("fs");
const path = require('path');

module.exports = (app, params) => {
  app.get('/errors/delete', isLoggedIn, function(req, res) {
    var b = path.join(__dirname, "/pages/boterr.html")
    if (!req.query.data) return res.render(b, { desc: "Error. No data was provided!", ref: "" });

    if (req.query.data == "all") {
      try {
        function* walkSync(dir) {
          const files = fs.readdirSync(dir, { withFileTypes: true });
          for (const file of files) {
            if (file.isDirectory()) {
              yield* walkSync(path.join(dir, file.name));
            } else {
              yield path.join(dir, file.name);
            }
          }
        }
        let ff = []
        for (const filePath of walkSync(path.join(__dirname, "/errors"))) {
          ff.push(filePath);
        }

        for (const rr of ff) {

          fs.unlinkSync(rr);

        }
      }
      catch (e) {
        return res.render(b, { desc: "Error. "+e, ref: "" });
      }
    }
    else{
      fs.unlinkSync()
    }
    res.redirect("/errors")
  })

  app.get('/errors', isLoggedIn, function(req, res) {
    var a = path.join(__dirname, "/pages/errors.html")
    var content = fs.readFileSync(a);
    var file = content.toString();
    let text = ''
    try {
      function* walkSync(dir) {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
          if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
          } else {
            yield path.join(dir, file.name);
          }
        }
      }
      let ff = []
      for (const filePath of walkSync(path.join(__dirname, "/errors"))) {
        ff.push(filePath);
      }

      for (const rr of ff) {
        var err = fs.readFileSync(rr);
        text += `<div align="left" class="w3-indigo"spellcheck = "false">
        <pre style="color:#FFFFFF">${err}</pre>
      </div>`
      }
    }
    catch (e) {
      text = "path is invalid or error occurred " + e
    }
    if (!text || text=="") {text="No Errors"};
    res.send(file.replace("<!data>", text));
    
  })

  app.post('/index/save', isLoggedIn, function(req, res) {
    let code = req.body.code

    fs.writeFileSync(path.join(process.cwd(), params.mainFile), req.body.code)
    res.redirect("/edit/mainfile")

  })
  app.get('/edit/mainfile', isLoggedIn, function(req, res) {
    var a = path.join(__dirname, "/pages/editindex.html")
    var content = fs.readFileSync(a);
    var file = content.toString();
    var code = fs.readFileSync(path.join(process.cwd(), params.mainFile)).toString()
    var d = file.replace("<!code>", code);
    res.send(d)

  })
  app.get('/reboot', isLoggedIn, function(req, res) {
    res.send("Rebooting system. If the panel does not automatically start within 1-5 minutes see your hosting service' console!")
    process.on("exit", () => {
      require("child_process").spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit",
      });
    });
    process.exit();

  })

  app.get('/command/update', isLoggedIn, function(req, res) {
    bot.loader?.update()
    res.redirect('/commands')
  })
  app.get('/command/new', isLoggedIn, function(req, res) {
    var folder = path.join(process.cwd(), "/" + params.commands)
    let pg = fs.readFileSync(path.join(__dirname, "/pages/newcmd.html")).toString();
    res.send(pg.replace("<!val>", folder).replace("<!val>", folder))

  })
  app.get('/command/delete', isLoggedIn, function(req, res) {
    let pathh = req.query.path;
    var b = path.join(__dirname, "/pages/boterr.html")
    if (!req.query.path) return res.render(b, { desc: "Error. No path was provided!", ref: "" });
    pathh = pathh.replace(/%2F/g, path.sep)
    fs.unlinkSync(pathh)
    res.redirect('/commands')
  })
  app.get('/command/edit', isLoggedIn, function(req, res) {
    let pathh = req.query.path
    var b = path.join(__dirname, "/pages/boterr.html")
    if (!req.query.path) return res.render(b, { desc: "Error. No path was provided!", ref: "" });
    let name = pathh.replace(/%2F/g, '/')
    pathh = pathh.replace(/%2F/g, ',')
    let code = fs.readFileSync(pathh)
    if (!code) return res.render(b, { desc: "Error. No valid path was provided!", ref: "" });
    var a = path.join(__dirname, "/pages/editcode.html")
    var content = fs.readFileSync(a);
    var file = content.toString();
    var d1 = file.replace("<!val>", req.query.path)
    var d2 = d1.replace("<!val2>", req.query.path)
    var d3 = d2.replace("<!code>", code)
    res.send(d3.replace("<!val3>", pathh))

  })
  app.post('/command/save', isLoggedIn, function(req, res) {
    let name = req.body.path
    name = name.replace(/\//g, path.sep)
    fs.writeFileSync(name, req.body.code)
    if (req.body.name == req.body.path) {
      res.redirect(`/command/edit?path=${name}`)
    }
    else {
      fs.renameSync(name, req.body.name)
      res.redirect(`/command/edit?path=${req.body.name}`)
    }
  })
  //COMMANDS 
  app.get('/commands', isLoggedIn, function(req, res) {
    var a = path.join(__dirname, "/pages/commands.html")
    var content = fs.readFileSync(a);
    var file = content.toString();
    let text = ''
    try {
      function* walkSync(dir) {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
          if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
          } else {
            yield path.join(dir, file.name);
          }
        }
      }
      let ff = []
      for (const filePath of walkSync(path.join(process.cwd(), params.commands))) {
        ff.push(filePath);
      }

      for (const rr of ff) {
        let pathh = rr.replace(/\//g, "%2F")
        /*text += `<label style="background-color:#000000;" style="margin: 70px;border: 5px solid #FFFFFF;"><li style="background-color:#000000;"><a href="/command/edit?path=${pathh}">
<button type="button" style="background-color:#000000;"> <img src="/bird.png" width="150" height="150" class="rounded-circle" style="margin: 70px;border: 5px solid #FFFFFF;"/><br>
<b style="color:#FFFFFF;">${rr.replace("/home/runner", "")}</b></button></a></li></label>`*/
        text += `
        <label style="background-color:#000000;" style="margin: 70px;border: 5px solid #FFFFFF;"><li style="background-color:#000000;">
        <div class="w3-card-4 w3-black">

<div class="w3-container w3-center">
  
  <img src="/bird.png" width="150" height="150" class="rounded-circle" style="margin: 70px;border: 5px solid #FFFFFF;"/>
  <h5>File: ${rr.replace("/home/runner", "")}</h5>

  <a href="/command/edit?path=${pathh}"><button class="w3-button w3-green">Edit</button></a>
  <a href="/command/delete?path=${pathh}" onclick="alert("Are you sure you want to delete this file?");"><button class="w3-button w3-red">Delete</button></a>
</div>

</div></li></label><br><br>`
      }
    }
    catch (e) {
      text = "path is invalid or error occurred"
    }

    res.send(file.replace("<!data>", text))
  })

  //login
  app.get('/', async (req, res) => {
    var a = path.join(__dirname, "/pages/login.html")
    if (req.session.pswd == params.password && req.session.uname == params.username) {
      return res.redirect("/panel");
    }
    else {
      return res.sendFile(a);
    }


  })
  app.get('/login', async (req, res) => {
    req.session.uname = req.query.uname;
    req.session.pswd = req.query.pswd;
    if (req.session.pswd == params.password && req.session.uname == params.username) {
      res.redirect("/panel")
    }
    else {
      res.redirect("/")
    }
  })
  //panel
  var bot = params.bot
  app.get('/panel', isLoggedIn, async (req, res) => {
    var content = fs.readFileSync(path.join(process.cwd(), params.mainFile));
    var file = content.toString()
    var a = path.join(__dirname, "/pages/main.html")
    var b = path.join(__dirname, "/pages/boterr.html")
    if (!bot.user) return res.render(b, { desc: " Oops, looks like the bot has not yet been initialized. Try again in a Few minutes", ref: "10" });
    res.render(a, { usertag: bot.user.tag, data: file })
  })


  app.get('/logo.png', async (req, res) => {
    var a = path.join(__dirname, "/assets/aoijs-logo.png")
    res.sendFile(a)
  })
  app.get('/bird.png', async (req, res) => {
    var a = path.join(__dirname, "/assets/aoi-bird.png")
    res.sendFile(a)
  })
  app.get('/guilds', isLoggedIn, async (req, res) => {
    var a = path.join(__dirname, "/pages/guilds.html")
    var content = fs.readFileSync(a);
    var file = content.toString();
    let server = bot.guilds.cache.map(z => z)
    let guild = '';
    for (let i = 0; i < server.length; i++) {

      guild += `<label><li>
<a href="/guild/info?id=${server[i].id}"><input type="image" name="guild" value="${server[i].id}" src="${server[i].iconURL({ dynamic: true, size: 4096 })}" width="150px" height="150px" class="rounded-circle" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'" style="margin: 70px;border: 5px solid #ff0000;"  required><br><b><p style="color:white;text-align: center;">${server[i].name}</p></b></a>
              </li></label>`

    }
    var rnew = file.replace("<!Add Guilds Here>", guild)
    res.send(rnew)
  })
  app.get('/guild/info', isLoggedIn, async (req, res) => {
    var b = path.join(__dirname, "/pages/boterr.html")
    if (!req.query.id) return res.render(b, { desc: "Error. No guild id was provided!", ref: "" });
    let guild = bot.guilds.cache.get(req.query.id);

    if (!guild) return res.render(b, { desc: "Error. No guild with id " + req.query.id + " was found!", ref: "" });

    let owner = bot.users.cache.get(guild.ownerId);
    var a = path.join(__dirname, "/pages/guildinfo.html")
    var content = fs.readFileSync(a);
    var file = content.toString();
    var img = guild.iconURL({ dynamic: true, size: 4096 })
    var im;
    if (!img) {
      im = "https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png"
    }
    else {
      im = img.replace(".webp", ".png")
    }

    let info = `Guild ID: ${guild.id}<br>Guild Name: <b>${guild.name}</b><br>Guild Owner ID: ${guild.ownerId}<br>Guild Owner Username:${owner.tag} <br>Members count: ${guild.memberCount}<br>Features: ${guild.features.join(', ').replace("_", " ").toLowerCase()}`
    var rnew = file.replace("<!Add Info Here>", info)
    var rneww = rnew.replace("<!GUILDID>", guild.id)
    var rrneww = rneww.replace("<!GUILDNAME>", guild.name)
    res.send(rrneww.replace("<!link>", im))

  })
  app.get('/guild/leave', isLoggedIn, async (req, res) => {
    if (!req.query.id) return res.send("Error. No guild provided!");
    let guild = bot.guilds.cache.get(req.query.id);

    if (!guild) return res.send("Error. No guild with id " + req.query.id + " was found!");
    guild.leave()
    res.redirect("/guilds")

  })

  function isLoggedIn(req, res, next) {
    if (req.session.pswd == params.password && req.session.uname == params.username) {
      return next()
    }
    else {
      res.redirect('/')
    }
  }

}