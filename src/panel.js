const express = require("express")
var session = require('express-session')
const path = require('path')
const fs = require('fs')




class Panel {
  constructor(params) {
    this.params = params;
  }
  loadPanel(){
    var params=this.params;
    //console.log(params)
    const thirtyDays=1000 * 60 * 60 * 24 * 30;
    const app = express()
    app.use(session({
      secret:params.secret,
      cookie: { maxAge: thirtyDays },
      resave: true,
      saveUninitialized: true
    }))
    app.listen(params.port)
    require("./framework.js")(app)
    
  }
}


module.exports = {
  Panel
}
