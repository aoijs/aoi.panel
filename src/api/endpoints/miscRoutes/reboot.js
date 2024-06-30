const fs = require("fs");
const path = require("path");


module.exports = {
    route : "/api/reboot",
    reqAuth : true,
    method : "get",
    perms:"startup",
    run : async (req,res,data)=> {
        res.json({"msg":"rebooting system"})
        function reboot(){
        process.on("exit", () => {
            require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached: true,
            stdio: "inherit",
            });
        });
        console.log("Rebooting System!");
        process.exit();
        }
        setTimeout(reboot,3000);
    }
}