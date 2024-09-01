const util = require("../utils.js");
function loadAPI(data,params){
    function checkAuth(req, res, next, perms) {
        const auth = params.auth;
        if(!req.body.auth){
          return res.status(401).json({"error":"No auth was provided."})
        }
        /*TODO: CHECK IF AUTH IS AN ACCOUNT AND THEN CHECK PERMISSIONS OF ACCOUNT*/ 
        const accountData = require(process.cwd()+params.accounts);
        for(let i=0;i<accountData.length;i++){
            let a = req.body.auth.split("-");
            if(a[0]==accountData[i].username && a[1]==accountData[i].password){
                for(let j=0;j<accountData[i].perms.length;j++){
                    if(perms==accountData[i].perms[j]||accountData[i].perms[j]=="admin" || perms == "startup"){
                        return next();
                    }
                }
            }
        }
        return res.status(401).json({"error":"Invalid auth key!"})
    }
    const endpoints = util.getAllDirs(__dirname+"/endpoints/fileRoutes").concat(util.getAllDirs(__dirname+"/endpoints/miscRoutes"));
    for(let i=0;i<endpoints.length;i++){
        if(endpoints[i].type=="file"){
            const endpoint = require(endpoints[i].path);
            
            if(endpoint.method=="get"){
                data.app.post(endpoint.route,(req,res,next)=>{(endpoint.reqAuth==true)?checkAuth(req,res,next,endpoint.perms):(req,res,next)=>{next()}},function(req,res){endpoint.run(req,res,data);});
            }
        }
    }
    
    data.app.get("/api/baseRoute",function(req,res){
        res.status(200).json({
            "data":process.cwd()
        })
    })
    data.app.post("/api/getAllLogs",function(req,res){
        if(!req.body.auth){
            return res.status(401).json({"error":"No auth was provided."})
        }
        const accountData = require(process.cwd()+params.accounts);
        for(let i=0;i<accountData.length;i++){
            let a = req.body.auth.split("-");
            if(a[0]==accountData[i].username && a[1]==accountData[i].password){
                for(let j=0;j<accountData[i].perms.length;j++){
                    if(accountData[i].perms[j]=="admin"){
                        return res.json(data.logs.getLogs());
                        ;
                    }
                }
            }
        }
        return res.status(401).json({"error":"Invalid auth key!"})

    })
    data.app.post("/api/getDelLogs",function(req,res){
        if(!req.body.auth){
            return res.status(401).json({"error":"No auth was provided."})
        }
        const accountData = require(process.cwd()+params.accounts);
        for(let i=0;i<accountData.length;i++){
            let a = req.body.auth.split("-");
            if(a[0]==accountData[i].username && a[1]==accountData[i].password){
                for(let j=0;j<accountData[i].perms.length;j++){
                    if(accountData[i].perms[j]=="admin"){
                        data.logs.resetLogs(a[0]);
                        return res.json({"data":"success"});
                        
                    }
                }
            }
        }
        return res.status(401).json({"error":"Invalid auth key!"})

    })

    data.app.get("/api",function(req,res){
        res.status(200).json({
            "usertag":data.params.client.user.tag,
            "avatarURL":`https://cdn.discordapp.com/avatars/${data.params.client.user.id}/${data.params.client.user.avatar}.png`,
            "id":data.params.client.user.id
        })
    })
}

module.exports = {
    loadAPI
}