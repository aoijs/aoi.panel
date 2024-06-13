const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/:auth/djseval",
    reqAuth : true,
    perms:"shell",
    method : "get",
    run : async (req,res,data)=> {
        var result;
        try {
        const bot = data.params.client;
        const client = bot;

        result=await eval(req.query.execute);
        }
        catch (e) {
        result = e;
        console.log("Panel D.js Eval Error:\n"+e)
        }
        const nd = require('util').inspect(result, { depth: 0 }).replace(/\n/g, '<br>')
        res.json({"data":nd.replace(/'/g, "")});
    }
}