const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/:auth/deleteFile",
    reqAuth : true,
    method : "get",
    perms:"readwrite",
    run : async (req,res,data)=> {
        const acc = data.params.accounts;
        let f = req.query.filepath;
        if(f.includes(acc)) return res.json({ "data": "Cannot access this file" });

        try{
            fs.unlinkSync(req.query.filepath.replace("\\\\","\\"), "")
            res.status(200).json({"data":"Success!"})
        }
        catch(e){
            res.status(400).json({"data":"Error Occurred while deleting file: "+req.query.filepath.replace("\\\\","\\")})
            console.log(e)
            console.log(e.stack)
        }
    }
}