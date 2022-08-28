const path = require('path');

module.exports = (app, params) => {
  const bot = params.bot;
  
  function isLoggedIn(req, res, next) {

    if (Array.isArray(params.username) === true && Array.isArray(params.password)) {
      for (let i = 0; i < params.username.length; i++) {
        if (req.session.uname === params.username[i] && req.session.pswd === params.password[i]) {
          return next();
        }
        else if ((i + 1) === params.username.length) {
          return res.redirect("/")
        }

      }

    }
    else if (req.session.pswd === params.password && req.session.uname === params.username) {
      return next()
    }
    else {
      res.redirect('/')
    }
  }
  
  require("./framework/guilds.js")(app,isLoggedIn,params)
  require("./framework/misc.js")(app,isLoggedIn,params)
  require("./framework/guilds.js")(app,isLoggedIn,params)
  require("./framework/commands.js")(app,isLoggedIn,params)
  require("./framework/interaction.js")(app,isLoggedIn,params)
  require("./framework/errors.js")(app,isLoggedIn,params)
  
  app.get('/', async (req, res) => {
    const a = path.join(__dirname, "/pages/login.html");
    res.sendFile(a);
  })
  app.get('/login', async (req, res) => {
    req.session.uname = req.query.uname;
    req.session.pswd = req.query.pswd;
    res.redirect("/panel")
  })
  app.get('/panel', isLoggedIn, async (req, res) => {
    const a = path.join(__dirname, "/pages/main.html");
    const b = path.join(__dirname, "/pages/boterr.html");
    if (!bot.user) return res.render(b, {
      desc: " Oops, looks like the bot has not yet been initialized. Try again in a Few minutes",
      ref: "10"
    });
    res.render(a, { usertag: bot.user.tag })
  })


  app.get('/logo.png', async (req, res) => {
    const a = path.join(__dirname, "/assets/aoijs-logo.png");
    res.sendFile(a)
  })
  app.get('/bird.png', async (req, res) => {
    const a = path.join(__dirname, "/assets/aoi-bird.png");
    res.sendFile(a)
  })

  app.get('*', function(req, res) {
    const b = path.join(__dirname, "/pages/boterr.html");
    res.status(404).render(b, { desc: "Oops. This page was not found.", ref: "" });
  });

}