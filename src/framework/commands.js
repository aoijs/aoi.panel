const fs = require("fs");
const path = require('path');

module.exports = (app, isLoggedIn, params) => {
  const bot = params.bot;
  app.get('/command/update', isLoggedIn, function(req, res) {
    bot.loader?.update()
    res.redirect('/commands')
  })
  app.get('/command/new', isLoggedIn, function(req, res) {
    const folder = path.join(process.cwd(), "/" + params.commands);
    let pg = fs.readFileSync(path.join(__dirname.replace("/framework", ""), "/pages/newcmd.html")).toString();
    res.send(pg.replace("<!val>", folder).replace("<!val>", folder).replace("<!val>", folder))

  })
  app.get('/command/delete', isLoggedIn, function(req, res) {
    let pathh = req.query.path;
    const b = path.join(__dirname.replace("/framework", ""), "/pages/boterr.html");
    if (!req.query.path) return res.render(b, { desc: "Error. No path was provided!", ref: "" });
    pathh = pathh.replace(/%2F/g, path.sep)
    fs.unlinkSync(pathh)
    res.redirect('/commands')
  })
  app.get('/command/edit', isLoggedIn, function(req, res) {
    let pathh = req.query.path
    const b = path.join(__dirname.replace("/framework", ""), "/pages/boterr.html");
    if (!req.query.path) return res.render(b, { desc: "Error. No path was provided!", ref: "" });
    let name = pathh.replace(/%2F/g, '/')
    pathh = pathh.replace(/%2F/g, ',')
    let code = fs.readFileSync(pathh)
    if (!code) return res.render(b, { desc: "Error. No valid path was provided!", ref: "" });
    const a = path.join(__dirname.replace("/framework", ""), "/pages/editcode.html");
    const content = fs.readFileSync(a);
    const file = content.toString();
    const d1 = file.replace("<!val>", req.query.path);
    const d2 = d1.replace("<!val2>", req.query.path);
    const d3 = d2.replace("<!code>", code);
    res.send(d3.replace("<!val3>", pathh))

  })
  app.post('/command/save', isLoggedIn, function(req, res) {
    let name = req.body.path
    name = name.replace(/\//g, path.sep)
    fs.writeFileSync(name, req.body.code)
    if (req.body.name === req.body.path) {
      res.redirect(`/command/edit?path=${name}`)
    } else {
      fs.renameSync(name, req.body.name)
      res.redirect(`/command/edit?path=${req.body.name}`)
    }
  })
  //COMMANDS
  app.get('/commands', isLoggedIn, function(req, res) {
    const a = path.join(__dirname.replace("/framework", ""), "/pages/commands.html");
    const content = fs.readFileSync(a);
    const file = content.toString();
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
        text += `
        <label style="background-color:#000000;" style="margin: 70px;border: 5px solid #FFFFFF;"><li style="background-color:#000000;">
        <div class="w3-card-4 w3-black">

<div class="w3-container w3-center">
  
  <img src="/bird.png" width="150" height="150" class="rounded-circle" style="margin: 70px;border: 5px solid #FFFFFF;" alt="bird"/>
  <h5>File: ${rr.replace("/home/runner", "")}</h5>

  <a href="/command/edit?path=${pathh}"><button class="w3-button w3-green">Edit</button></a>
  <a href="/command/delete?path=${pathh}" onclick="alert("Are you sure you want to delete this file?");"><button class="w3-button w3-red">Delete</button></a>
</div>

</div></li></label><br><br>`
      }
    } catch (e) {
      text = "path is invalid or error occurred"
    }

    res.send(file.replace("<!data>", text))
  })
}