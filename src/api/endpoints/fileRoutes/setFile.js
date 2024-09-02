const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/setFile",
    reqAuth : true,
    method : "get",
    perms:"readwrite",
    run : async (req,res,data)=> {
        const acc = data.params.accounts;
        
        let f = req.body.file;
        let fl = acc.split("/")[acc.split("/").length-1];
        if(f.endsWith(fl)) return res.json({ "data": "Cannot access this file" });
        if(f.includes("@aoijs/aoi.panel")||f.includes("@akarui/aoi.panel")||f.includes("@aoijs\\aoi.panel")||f.includes("@akarui\\aoi.panel")) return res.json({ "data": "Cannot access this file" });
        if (!f) return res.status(404).json({ "err": "file not provided" });
        const ogcode = (fs.readFileSync(f).toString());

        let c = req.body.code;
        if (!c) return res.status(404).json({ "err": "code not provided" });
        //console.log(c);
        fs.writeFileSync(f,c);
        data.logs.newLog(req.body.auth.split("-")[0]+" edited a file: "+f,"edit",ogcode,c);

        res.json({data:"success"})
        
    }
}