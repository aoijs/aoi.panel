const fs = require("fs");

function loadGUI(data,params){
    const app = data.app;

    function isLoggedIn(req,res,next){
        for(let i=0;i<data.accounts.length;i++){
            if(data.accounts[i].username==req.session.username && data.accounts[i].password==req.session.password){
                return next();
            }
        }
        res.redirect("/");

    }
    app.get("/",function(req,res){
        res.sendFile(__dirname+"/views/login.html");
    })
    
    fs.readdirSync(__dirname+"/assets/").forEach(file => {
        app.get("/assets/"+file,function(req,res){
            res.sendFile(__dirname+"/assets/"+file)
        })
    });
    fs.readdirSync(__dirname+"/assets/images/").forEach(file => {
        app.get("/images/"+file,function(req,res){
            res.sendFile(__dirname+"/assets/images/"+file)
        })
    });

    app.post("/pass/validate/",async (req,res)=>{
        let uname= req.body.username;
        let pass = req.body.password;
        for(let i=0;i<data.accounts.length;i++){
            if(data.accounts[i].username==uname && data.accounts[i].password==pass){
                return res.json({data:true})
            }
        }
        return res.json({data:false})
    })
    
    app.get('/login',  (req, res) => {
      req.session.username = req.query.username;
      req.session.password = req.query.password;
      res.redirect("/panel")
    })
    app.get('/logout',  (req, res) => {
      req.session.username = "";
      req.session.password = "";
      res.redirect("/?loggedout=true")
    })

    app.get("/panel",isLoggedIn,(req,res)=>{
        const data = fs.readFileSync(__dirname+"/views/panel.html").toString()
        const auth = req.session.username+"-"+req.session.password
        res.send(data.replace(/(!auth)/g,auth));
    })
    app.get("/editor",isLoggedIn,(req,res)=>{
        const data = fs.readFileSync(__dirname+"/views/editor.html").toString()
        const auth = req.session.username+"-"+req.session.password;
        res.send(data.replace(/(!auth)/g,auth));
    })
    app.get("/logs",isLoggedIn,(req,res)=>{
        const data = fs.readFileSync(__dirname+"/views/logs.html").toString()
        const auth = req.session.username+"-"+req.session.password;
        res.send(data.replace(/(!auth)/g,auth));
    })
    app.get("/eval",isLoggedIn,(req,res)=>{
        const data = fs.readFileSync(__dirname+"/views/eval.html").toString()
        const auth = req.session.username+"-"+req.session.password;
        res.send(data.replace(/(!auth)/g,auth));
    })
    
}


module.exports = {
    loadGUI
}