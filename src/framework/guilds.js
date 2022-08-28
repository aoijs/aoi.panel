const fs = require("fs");
const path = require('path');

module.exports = (app, isLoggedIn, params) => {
  const bot = params.bot;
  app.get('/guilds', isLoggedIn, async (req, res) => {
    const a = path.join(__dirname.replace("/framework", ""), "/pages/guilds.html");
    const content = fs.readFileSync(a);
    const file = content.toString();
    let server = bot.guilds.cache.map(z => z)
    let guild = '';
    for (let i = 0; i < server.length; i++) {

      guild += `<label><li>
<a href="/guild/info?id=${server[i].id}"><input type="image" name="guild" value="${server[i].id}" src="${server[i].iconURL({
        dynamic: true,
        size: 4096
      })}" width="150px" height="150px" class="rounded-circle" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'" style="margin: 70px;border: 5px solid #ff0000;"  required><br><b><p style="color:white;text-align: center;">${server[i].name}</p></b></a>
              </li></label>`

    }
    const rnew = file.replace("<!Add Guilds Here>", guild);
    res.send(rnew)
  })
  app.get('/guild/info', isLoggedIn, async (req, res) => {
    const b = path.join(__dirname.replace("/framework", ""), "/pages/boterr.html");
    if (!req.query.id) return res.render(b, { desc: "Error. No guild id was provided!", ref: "" });
    let guild = bot.guilds.cache.get(req.query.id);

    if (!guild) return res.render(b, { desc: "Error. No guild with id " + req.query.id + " was found!", ref: "" });

    let owner = bot.users.cache.get(guild.ownerId);
    const a = path.join(__dirname.replace("/framework", ""), "/pages/guildinfo.html");
    const content = fs.readFileSync(a);
    const file = content.toString();
    const img = guild.iconURL({ dynamic: true, size: 4096 });
    let im;
    if (!img) {
      im = "https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png"
    } else {
      im = img.replace(".webp", ".png")
    }

    let info = `Guild ID: ${guild.id}<br>Guild Name: <b>${guild.name}</b><br>Guild Owner ID: ${guild.ownerId}<br>Guild Owner Username:${owner.tag} <br>Members count: ${guild.memberCount}<br>Features: ${guild.features.join(', ').replace("_", " ").toLowerCase()}`
    const rnew = file.replace("<!Add Info Here>", info);
    const rneww = rnew.replace("<!GUILDID>", guild.id);
    const rrneww = rneww.replace("<!GUILDNAME>", guild.name);
    res.send(rrneww.replace("<!link>", im))

  })
  app.get('/guild/leave', isLoggedIn, async (req, res) => {
    if (!req.query.id) return res.send("Error. No guild provided!");
    let guild = bot.guilds.cache.get(req.query.id);

    if (!guild) return res.send("Error. No guild with id " + req.query.id + " was found!");
    await guild.leave()
    res.redirect("/guilds")

  })
}