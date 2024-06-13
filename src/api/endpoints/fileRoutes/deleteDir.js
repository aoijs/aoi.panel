const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/:auth/deleteDir",
    reqAuth : true,
    method : "get",
    perms:"readwrite",
    run : async (req,res,data)=> {
        try{
            fs.rmSync(req.query.filepath.replace("\\\\","\\"), { recursive: true, force: true });
            res.status(200).json({"data":"Success!"})
        }
        catch(e){
            res.status(400).json({"data":"Error Occurred while deleting directory: "+req.query.filepath.replace("\\\\","\\")})
            console.log(e)
            console.log(e.stack)
        }
    }
}