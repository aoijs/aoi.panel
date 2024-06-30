const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/aoieval",
    reqAuth : true,
    method : "get",
    perms:"shell",
    run : async (req,res,data)=> {
        var result;
        try {
        const client = data.params.client;

        result = await client.functionManager.interpreter(
            client,
            {},
            [],
            {
            name: "aoi Eval",
            code: `${req.body.execute}`,
            },
            client.db,
            true,
        )

        result = result.code
        }
        catch (e) {
        result = e;
        console.log("Panel Aoi.js Eval Error:\n"+e)

        }
        const nd = require('util').inspect(result, { depth: 0 }).replace(/\n/g, '<br>')
        res.json({"data":nd.replace(/'/g, "")});
    }
}