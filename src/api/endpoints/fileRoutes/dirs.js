const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/:auth/dirs",
    reqAuth : true,
    method : "get",
    perms:"readwrite",
    run : async (req,res)=> {
        var dirR = req.query.dir;
        if (!dirR) {
          dirR = process.cwd()
        }
        if (dirR.includes("root")) { dirR = process.cwd() }
      
        var list = [];
        try {
          function* walkSync(dir) {
            const files = fs.readdirSync(dir, { withFileTypes: true });
            for (const file of files) {
              if (file.isDirectory()) {
                yield { "path": path.join(dir, file.name), "type": "dir", "root": dirR };
              } else {
                yield { "path": path.join(dir, file.name), "type": "file", "root": dirR };
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
          return res.json({ "error": e })
        }
      
        res.json(list)
      }
}