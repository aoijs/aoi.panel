const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/:auth/createFile",
    reqAuth : true,
    method : "get",
    perms:"readwrite",
    run : async (req,res,data)=> {
        try{
      
            const path = require("path")
            fs.writeFileSync(path.normalize(req.query.filepath).replace("\\","\\\\"), "")
            res.status(200).json({"data":"Success!"})
          }
          catch(e){
            res.status(400).json({"data":"Error Occurred while creating file: "+req.query.filepath.replace("\\\\","\\")})
            console.log(e)
            console.log(e.stack)
          }
    }
}