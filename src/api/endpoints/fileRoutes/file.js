const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/:auth/file",
    reqAuth : true,
    perms:"readwrite",
    method : "get",
    run : async (req,res,data)=> {
        let f = req.query.file;
        const acc = data.params.accounts;
        if (!f) return res.status(404).json({ "err": "file not provided" });
        if(f.includes(acc)) return res.json({ "data": ["Cannot access this file"] });
        //console.log(f)
        var list = [];
        try {
          function* walkSync(dir) {
            const files = fs.readdirSync(dir, { withFileTypes: true });
            for (const file of files) {
              if (file.isDirectory()) {
                if (file.name.includes("node_modules") == false && file.name.includes(".config") == false && file.name.includes(".cache") == false && file.name.includes(".upm") == false) {
                  yield* walkSync(path.join(dir, file.name));
                }
              } else {
                yield path.join(dir, file.name);
              }
            }
          }
    
          let ff = []
          for (const filePath of walkSync(process.cwd())) {
            ff.push(filePath);
          }
    
          for (const rr of ff) {
            list.push(rr);
    
          }
        } catch (e) {
          throw (e)
        }
    
        for (file in list) {
          if (f == list[file]) {
            return res.json({ "data": fs.readFileSync(list[file]).toString().split("\n") });
          }
        }
        return res.status(404).json({ "err": "file not found" })
      }
}