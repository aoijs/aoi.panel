const aoijs = require("aoi.js")
const fs = require("fs")

module.exports = (app, params) => {
  const path = require('path')

  app.get('/commands', function(req, res) {
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
      for (const filePath of walkSync(path.join(process.cwd(),params.commands))) {
        ff.push(filePath);
      }

      for (const rr of ff) {
        let pathh = rr.replace(/\//g, "%2F")
        text += `<label style="background-color:#000000;" style="margin: 70px;border: 5px solid #FFFFFF;"><li style="background-color:#000000;"><a href="/command/edit?path=${pathh}">
<button type="button" style="background-color:#000000;"> <img src="/bird.png" width="150" height="150" class="rounded-circle" style="margin: 70px;border: 5px solid #FFFFFF;"/><br>
<b style="color:#FFFFFF;">${rr.replace("/home/runner","")}</b></button></a></li></label>`
      }
    }
    catch (e) {
      text = "path is invalid or error occurred"
    }

    res.send(file.replace("<!data>", text))
  })
  app.get('/commands.js', function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/dark-theme/commands-highlight.js"))
  })
  app.post('/new_command', isLoggedIn, function(req, res) {

    res.send(req.body)
  })

  app.get('/', async (req, res) => {
    var a = path.join(__dirname, "/pages/login.html")

    res.sendFile(a)
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
  var bot = params.bot
  app.get('/panel', isLoggedIn, async (req, res) => {
    var content = fs.readFileSync(path.join(process.cwd(), params.mainFile));
    var file = content.toString()
    var a = path.join(__dirname, "/pages/main.html")
    var b = path.join(__dirname, "/pages/boterr.html")
    if (!bot.user) return res.render(b, { desc: " Oops, looks like the bot has not yet been initialized. Try again in a Few minutes", ref: "10" });
    res.render(a, { usertag: bot.user.tag, data: file })
  })


  app.get('/data', isLoggedIn, async (req, res) => {
    var b = req.session.uname;
    var a = req.session.pswd;
    res.send(a + "\n " + b)
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
    if (!req.query.id) return res.send("Error. No guild provided!");
    let guild = bot.guilds.cache.get(req.query.id);

    if (!guild) return res.send("Error. No guild with id " + req.query.id + " was found!");
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
      res.redirect('/guilds')
    }
  }

}