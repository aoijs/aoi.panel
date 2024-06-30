const fetch = require("node-fetch")


async function checkVersion() {


  const data = await fetch('https://registry.npmjs.com/@akarui/aoi.panel').then(r => r.json());
  let c_version = require('../package.json').version
  if (c_version.includes("dev")===true) return console.log("You are using dev version of aoijs/aoi.panel.");
  let l_version = data["dist-tags"].latest;
  if (c_version !== l_version && !(c_version >= l_version)) {
    console.log("\x1b[33m%s\x1b[0m","You are not using the latest version of @aoijs/aoi.panel!\nCurrent Version:" + c_version + "\nLatest Version:" + l_version);
  }

}

function checkPackage() {

  let c_name = require('../package.json').name;
  
  if (c_name !== "@aoijs/aoi.panel") {
    console.log("\x1b[33m%s\x1b[0m","You are not using the official version of @aoijs/aoi.panel! The Developers at aoijs are not responsible for anything going wrong with your bot! Install the official panel using: npm i @aoijs/aoi.panel");
  }
}

function checkParams(params){

  if(params.client===undefined) throw new Error("Please provide a valid aoi.js client");
  if(params.port===undefined) throw new Error("Please provide a valid port for aoi.panel to run on!");
  if(params.accounts===undefined || require(process.cwd()+params.accounts).length ===0) throw new Error("Please provide a valid accounts file for aoi.panel to use!");
  const accounts = require(process.cwd()+params.accounts);
  for(let i=0;i<accounts.length;i++){
    if(accounts[i].username===undefined || accounts[i].password===undefined) throw new Error("Error: Invalid account in accounts file!");
    if(accounts[i].perms===undefined || accounts[i].perms.length===0) throw new Error("Error: Invalid permissions in accounts file for account "+(i+1)+"!");
    let admin = false;
    let startup = false;
    for(let j=0;j<accounts[i].perms.length;j++){
      let perm = accounts[i].perms[j].toLowerCase();
      if(perm=="admin"){admin=true;}
      if(perm=="startup"){startup=true;}
      //console.log(perm)
      if(perm=="admin" || perm=="readwrite" || perm=="shell" || perm=="startup"){} else throw new Error("Error: Invalid permissions in accounts file for account "+(i+1)+"!");
    }
    if(admin===false && startup===false) throw new Error("Error: Invalid permissions in accounts file for account "+(i+1)+"! An account must either have ADMIN permission or atleast STARTUP permission!");
  }

  const {AoiError} = require("aoi.js");
  let c_version = require('../package.json').version

  AoiError.createConsoleMessage(
    [
      {
        text: `Installed version: ${c_version}`,
        textColor: "green",
      },
      {
        text: `Accounts Made for aoi.panel: ${require(process.cwd()+params.accounts).length}`,
        textColor: "blue",
      },
    ],
    "white",
    {
      text: "@aoijs/aoi.panel ",
      textColor: "cyan",
    }
  );
}


function checkAuth(params,req, res, next) {
    const auth = params.auth;
    if(!req.params.auth){
      return res.status(401).json({"error":"No auth was provided."})
    }
    if(req.params.auth!=auth){
      return res.status(401).json({"error":"Invalid auth key!"})
    }
    if(!data.params.client){
      return res.status(503).json({"error":"bot has not yet been initialized!"})
    }
    if(req.params.auth==auth){
      return next();
    }
}


const fs = require("fs");
const path = require("path");


function getAllDirs(dirR){
  var list = [];
        try {
          function* walkSync(dir) {
            const files = fs.readdirSync(dir, { withFileTypes: true });
            for (const file of files) {
              if (file.isDirectory()) {
                yield { "path": path.join(dir, file.name), "type": "dir" }
              } else {
                yield { "path": path.join(dir, file.name), "type": "file" };
              }
            }
          }
      
          let ff = []
          for (const filePath of walkSync(dirR)) {
            ff.push(filePath);
          }
      
          for (const rr of ff)  {
            list.push(rr);
      
          }
        } catch (e) {
          return e
        }

        return list;
      
}

function checkPanel(thisd){
  if(!thisd.app) {
    const {AoiError} = require("aoi.js");
        
        AoiError.createConsoleMessage(
          [],"red",{
            text: "Panel is not yet running! Use loadPanel() to do so",
            textColor: "white"
          }
        );
  }
}
module.exports = {
  checkVersion,
  checkPackage,
  checkParams,
  checkAuth,
  getAllDirs,
  checkPanel
}