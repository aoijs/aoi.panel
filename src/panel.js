const express = require("express")
var session = require('express-session')
const path = require('path')
const fs = require('fs')




class Panel {
  constructor(params) {
    this.params = params;
    console.log("\x1b[32m%s\x1b[0m","Initializing Aoi.js Panel...")
    
    if(!params.bot){
      console.log("\x1b[31m%s\x1b[0m", "Aoi.js client was not provided. Exiting Code...")
      process.exit(0)
    }
    if(!params.port){
      console.log("\x1b[33m%s\x1b[0m", "An port was not provided. Taking default as 8000.")
      params.port = 8000
    }
    if(!params.username){
      console.log("\x1b[31m%s\x1b[0m", "Username was not provided. Exiting Code...")
      process.exit(0)
    }
    if(!params.password){
      console.log("\x1b[31m%s\x1b[0m", "Password was not provided. Exiting Code...")
      process.exit(0)
    }
    if(!params.secret){
      console.log("\x1b[31m%s\x1b[0m", "Session secret (secret) was not provided. Exiting Code...")
      process.exit(0)
    }
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
    require("./framework.js")(app,params)
    console.log("\x1b[32m%s\x1b[0m","Aoi.js Panel ready on port: "+params.port)
  }
}


module.exports = {
  Panel
}
