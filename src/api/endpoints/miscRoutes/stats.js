const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/:auth/stats",
    reqAuth : true,
    method : "get",
    perms:"startup",
    run : async (req,res,data)=> {
        let client = data.params.client;
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        const initial = process.cpuUsage();
        const start = Date.now();
        while (Date.now() - start > 1);
        const final = process.cpuUsage(initial);
        let cpu = ((final.user + final.system) / 1000).toFixed(2);
        
        res.json({
        "ram": process.memoryUsage().rss / 1024 / 1024,
        "uptime": days + "d " + hours + "h " + minutes + "m " + seconds + "s ",
        "cpu": cpu
        })
    }
}