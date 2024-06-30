const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/guilds",
    reqAuth : true,
    method : "get",
    perms:"startup",
    run : async (req,res,data)=> {
        let server = await data.params.client.guilds.cache.map(z => z)
        res.json(server);
    }
}