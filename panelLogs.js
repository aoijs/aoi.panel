const fs = require('fs');
const { format } = require('date-fns');

class PanelLogs {
    
    constructor(data){
        this.data = data;
        this.folder = __dirname+"/logs/panelLogs";
        
        if(!fs.existsSync(this.folder)){
            fs.mkdirSync(this.folder, {recursive: true});
        }

    }
    newLog(logdata,type,ogcode,code){

        const date = Date.now();
        var json = JSON.parse(fs.readFileSync(this.folder+"/logs.json").toString());
        if(type!="edit"){
            let log = {
                "date":date,
                "data":logdata
            }
            json.push(log);
        }
        else{
            let log = {
                "date":date,
                "data":logdata,
                "type":"edit",
                "ogcode":ogcode,
                "code":code
            }
            json.push(log);
        }
        //console.log(log);
        fs.writeFileSync(this.folder+"/logs.json",JSON.stringify(json));

    }
    getLogs(){
    let jjs = JSON.parse(fs.readFileSync(this.folder+"/logs.json").toString());
        return jjs;
    }
    resetLogs(usr){
        const date = Date.now();
        let json = []
        let log = {
            "date":date,
            "data":`${usr} cleared the logs.`
        }
        json.push(log);

        fs.writeFileSync(this.folder+"/logs.json",JSON.stringify(json));
    }



}

module.exports = {
    PanelLogs
}