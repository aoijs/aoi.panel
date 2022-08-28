const fs = require("fs");
const path = require('path');

module.exports = (app, isLoggedIn, params) => {
  const bot = params.bot;
  app.post('/index/save', isLoggedIn, function(req, res) {
    let code = req.body.code

    fs.writeFileSync(path.join(process.cwd(), params.mainFile), req.body.code)
    res.redirect("/edit/mainfile")

  })
  app.get('/edit/mainfile', isLoggedIn, function(req, res) {
    const a = path.join(__dirname.replace("/framework", ""), "/pages/editindex.html");
    const content = fs.readFileSync(a);
    const file = content.toString();
    const code = fs.readFileSync(path.join(process.cwd(), params.mainFile)).toString();
    const d = file.replace("<!code>", code);
    res.send(d)

  })

  app.post('/aoieval', isLoggedIn, async (req, res) => {
    const a = path.join(__dirname.replace("/framework", ""), "/pages/aoievalexec.html");
    const content = fs.readFileSync(a);
    const file = content.toString();
    let result;
    try {
      const client = bot

      result = await client.functionManager.interpreter(
        client,
        {},
        [],
        {
          name: "aoi Eval",
          code: `${req.body.execute}`,
        },
        client.db,
        true,
      )

      result = result.code
    }
    catch (e) {
      result = e
    }
    const data = require('util').inspect(result, { depth: 0 }).replace(/\n/g, '<br>')
    res.send(file.replace("<!result>", data.replace(/'/g, "")).replace("<!data>", req.body.execute))
  })
  app.get('/aoieval', isLoggedIn, function(req, res) {
    const b = path.join(__dirname.replace("/framework", ""), "/pages/aoieval.html");
    res.render(b);
  })
  app.get('/djseval', isLoggedIn, function(req, res) {
    const b = path.join(__dirname.replace("/framework", ""), "/pages/djseval.html");
    res.render(b);
  })
  app.post('/djseval', isLoggedIn, async (req, res) => {
    let result;
    const a = path.join(__dirname.replace("/framework", ""), "/pages/djsevalexec.html");
    const content = fs.readFileSync(a);
    const file = content.toString();
    try {
      const client = bot
      result = await eval(req.body.execute)

    }
    catch (e) {
      result = e
    }
    res.send(file.replace("<!result>", require('util').inspect(result, { depth: 0 }).replace(/\n/g, '<br>')).replace("<!data>", req.body.execute))


  })
  app.post('/shellexec', isLoggedIn, async (req, res) => {
    const a = path.join(__dirname.replace("/framework", ""), "/pages/shellexec.html");
    const content = fs.readFileSync(a);
    const file = content.toString();
    const exec = require('child_process')
    let result = '';
    try {
      result = await exec.execSync(req.body.execute).toString().replace(/\n/g, '<br>')
    }
    catch (e) {
      result = e
    }
    const data = require('util').inspect(result, { depth: 0 }).replace(/\n/g, '<br>')
    res.send(file.replace("<!result>", data.replace(/'/g, "")))


  })
  app.get('/stats', isLoggedIn, function(req, res) {
    const b = path.join(__dirname.replace("/framework", ""), "/pages/stats.html");
    res.render(b);
  })
  app.get('/shell', isLoggedIn, function(req, res) {
    const b = path.join(__dirname.replace("/framework", ""), "/pages/shell.html");
    res.render(b);
  })
  app.get('/stats/data', async (req, res) => {
    let client = bot
    let days = Math.floor(client.uptime / 86400000);

    let hours = Math.floor(client.uptime / 3600000) % 24;

    let minutes = Math.floor(client.uptime / 60000) % 60;

    let seconds = Math.floor(client.uptime / 1000) % 60;
    const initial = process.cpuUsage();
    const start = Date.now();
    while (Date.now() - start > 1);
    const final = process.cpuUsage(initial);
    let cpu = ((final.user + final.system) / 1000).toFixed(2);
    res.json({
      "ram": process.memoryUsage().rss / 1024 / 1024,
      "uptime": days + "d " + hours + "h " + minutes + "m " + seconds + "s ",
      "cpu": cpu

    })
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
}