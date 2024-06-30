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
        
        if(f.includes(acc)) return res.json({ "data": "Cannot access this file" });
        if (!f) return res.status(404).json({ "err": "file not provided" });
        let c = req.body.code;
        if (!c) return res.status(404).json({ "err": "code not provided" });
        //console.log(c);
        fs.writeFileSync(f,c);
        res.json({data:"success"})
        
    }
}