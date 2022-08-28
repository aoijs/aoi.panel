const fs = require("fs");
const path = require('path');

module.exports = (app, isLoggedIn, params) => {
  app.get('/errors/delete', isLoggedIn, function(req, res) {
    const b = path.join(__dirname.replace("/framework", ""), "/pages/boterr.html");
    if (!req.query.data) return res.render(b, { desc: "Error. No data was provided!", ref: "" });

    if (req.query.data === "all") {
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
        for (const filePath of walkSync(path.join(__dirname.replace("/framework", ""), "/errors"))) {
          ff.push(filePath);
        }

        for (const rr of ff) {

          fs.unlinkSync(rr);

        }
      } catch (e) {
        return res.render(b, { desc: "Error. " + e, ref: "" });
      }
    } else {
      fs.unlinkSync()
    }
    res.redirect("/errors")
  })

  app.get('/errors', isLoggedIn, function(req, res) {
    const a = path.join(__dirname.replace("/framework", ""), "/pages/errors.html");
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
      for (const filePath of walkSync(path.join(__dirname.replace("/framework", ""), "/errors"))) {
        ff.push(filePath);
      }

      for (const rr of ff) {
        const err = fs.readFileSync(rr);
        text += `<div align="left" class="w3-indigo"spellcheck = "false">
        <pre style="color:#FFFFFF">${err}</pre>
      </div>`
      }
    } catch (e) {
      text = "Path is invalid or error occurred " + e
    }
    if (!text || text === "") {
      text = "No Errors. <br> <b>Note, this page will not work unless the callback 'onError()' is used.<b>"
    }
    ;
    res.send(file.replace("<!data>", text));

  })
}