const path = require('path')
const fs = require('fs')
const util = require("./utilFuncs.js");
const api = require('./api/api.js');
const gui = require("./gui/gui.js");


const { AoiError } = require("aoi.js");


class Panel {
    constructor(params) {
      this.params = params;
      util.checkVersion();
      util.checkPackage();
      util.checkParams(params);
      const accounts = require(process.cwd()+params.accounts);
      this.accounts = accounts;
      params.client.awaitedCommand({
        name: "panelawaitedcommand",
        code: `$cacheMembers[$guildID;false]`
      });
      params.client.readyCommand({
        channel: "$randomChannelID",
        code: `$forEachGuild[1s;{};panelawaitedcommand;]`
      })
      setTimeout(()=>{util.checkPanel(this)},10000)
      
      
      
    }
    loadPanel(){
      const params = this.params;
      const app = require("express")();
      this.app = app;
      
      const thirtyDays = 1000 * 60 * 60 * 24 * 30;

      app.use(require("express").json())    // <==== parse request body as JSON
      const bodyParser = require('body-parser');
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json())
      app.use(require("express-session")({
        secret: require('crypto').randomBytes(16).toString("hex"),
        cookie: { maxAge: thirtyDays },
        resave: true,
        saveUninitialized: true
      }))
      app.listen(params.port,function(){
        
        AoiError.createConsoleMessage(
          [],"green",{
            text: "panel running on port " + params.port,
            textColor: "white"
          }
        );

      });
      api.loadAPI(this,params,util.checkAuth);
      gui.loadGUI(this,params);
    }

  }
  
  
  module.exports = {
    Panel
  }