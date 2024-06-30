const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/createFile",
    reqAuth : true,
    method : "get",
    perms:"readwrite",
    run : async (req,res,data)=> {
        try{
      
            const path = require("path")
            let p = path.normalize(req.body.filepath).replace("\\","\\\\");
            let a= p.split("\\");
            if(a.length==1){
              a=p.split("/")
            }
            let dir = p.replace(a[a.length-1],"")
            if (!fs.existsSync(dir)){
              fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(p, "")
            res.status(200).json({"data":"Success!"})
          }
          catch(e){
            res.status(400).json({"data":"Error Occurred while creating file: "+req.body.filepath.replace("\\\\","\\")})
            console.log(e)
            console.log(e.stack)
          }
    }
}