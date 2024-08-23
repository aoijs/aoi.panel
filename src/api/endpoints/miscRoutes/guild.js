const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/guild/",
    reqAuth : true,
    method : "get",
    perms:"startup",
    run : async (req,res,data)=> {
        let guild = await data.params.client.guilds.cache.get(req.body.id);
        if(!guild){return res.status(404).json({"data":"Guild not found!"})}
        var owner;
        try {
        owner = await bot.users.cache.get(guild.ownerId);
        return res.json({"guildid":guild.id,"guildname":guild.name,"owner":owner.tag,"ownerid":owner.id})
        }
        catch(e){
        owner="Bot owner not cached!"
        return res.json({"guildid":guild.id,"guildname":guild.name,"owner":owner,"ownerid":owner})
        }
    }
}