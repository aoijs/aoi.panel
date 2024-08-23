const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/deleteDir",
    reqAuth : true,
    method : "get",
    perms:"readwrite",
    run : async (req,res,data)=> {
        try{
            fs.rmSync(req.body.filepath.replace("\\\\","\\"), { recursive: true, force: true });
            
            data.logs.newLog(req.body.auth.split("-")[0]+" deleted a directory: "+req.body.filepath.replace("\\\\","\\"));
            res.status(200).json({"data":"Success!"})
        }
        catch(e){
            res.status(400).json({"data":"Error Occurred while deleting directory: "+req.body.filepath.replace("\\\\","\\")})
            console.log(e)
            console.log(e.stack)
        }
    }
}