const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/:auth/guild/leave",
    reqAuth : true,
    method : "get",
    perms:"admin",
    run : async (req,res,data)=> {
        if (!req.query.id) return res.status(401).json({"data":"guild not provided"});
        let guild = bot.guilds.cache.get(req.query.id);

        if (!guild) return res.status(401).json({"data":"guild not found!"});
        try{
        await guild.leave()
        return res.json({"data":"Successfully left the guild!"})
        }
        catch(e){
        res.status(400).json({"data":"An error occurred. Check your editor's console!"});
        console.log("Error occurred while leaving guild with ID: "+req.query.id+"\n\n");
        return console.log(e.stack);
        }
    }
}