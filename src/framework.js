const aoijs = require("aoi.js")

module.exports = (app,params) => {
  const path = require('path')
  
  app.get('/commands', isLoggedIn , function(req,res) {
    res.sendFile(path.join(__dirname, "/pages/dark-theme/command.html"))
  })
  app.get('/commands.js', function(req,res) {
    res.sendFile(path.join(__dirname, "/pages/dark-theme/commands-highlight.js"))
  })


  app.get('/', async (req,res) => {
    var a = path.join(__dirname,"/pages/login.html")

    res.sendFile(a)
  })
  app.get('/login', async (req,res) => {
    req.session.uname=req.query.uname;
    req.session.pswd=req.query.pswd;
    if (req.session.pswd == params.password && req.session.uname == params.username){
      res.redirect("/panel")
    }
    else{
      res.redirect("/")
    }
  })
  var bot = params.bot
  app.get('/panel', async (req,res) => {
    var a = path.join(__dirname,"/pages/main.html")
    res.render(a,{ usertag:bot.user.tag })
  })
  

  app.get('/data', isLoggedIn , async (req,res) => {
    var b = req.session.uname;
    var a = req.session.pswd;
    res.send(a+"\n "+b)
  })

  app.get('/logo.png', async (req,res) => {
    var a = path.join(__dirname,"/assets/aoijs-logo.png")
    res.sendFile(a)
  })
  app.get('/bird.png', async (req,res) => {
    var a = path.join(__dirname,"/assets/aoi-bird.png")
    res.sendFile(a)
  })
  
  
  function isLoggedIn(req,res,next) {
    if(req.session.pswd == params.password && req.session.uname == params.username){
      return next()
    }
    else {
      res.redirect('/')
    }
  }

}