const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/deleteFile",
    reqAuth : true,
    method : "get",
    perms:"readwrite",
    run : async (req,res,data)=> {
        const acc = data.params.accounts;
        let f = req.body.file;
        
        if(f.includes(acc)) return res.json({ "data": "Cannot access this file" });

        try{
            fs.unlinkSync(req.body.file.replace("\\\\","\\"), "")
            
            data.logs.newLog(req.body.auth.split("-")[0]+" deleted the file: "+req.body.file.replace("\\\\","\\"));
            res.status(200).json({"data":"Success!"})
        }
        catch(e){
            res.status(400).json({"data":""})
        }
    }
}