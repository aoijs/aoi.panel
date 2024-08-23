const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/shellexec",
    reqAuth : true,
    method : "get",
    perms:"shell",
    run : async (req,res,data)=> {
        if(!req.body.execute){
            return res.status(401).json({"error":"execute code not provided!"})
        }
        const exec = require('child_process')
        try {
            result = await exec.execSync(req.body.execute).toString().replace(/\n/g, '<br>')
        }
        catch (e) {
            result = e
        }
        data.logs.newLog(req.body.auth.split("-")[0]+" executed a command: "+req.body.execute);
        const dataa = require('util').inspect(result, { depth: 0 }).replace(/\n/g, '<br>')
        res.json({"data":dataa.replace(/'/g, "")})
    }
}