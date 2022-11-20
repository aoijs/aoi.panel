const client = require("../index");
const { Collection } = require("discord.js")
const fs = require("fs")
const config= require("../config.json")
const colours = require(".././utils/colors.js")
 

client.on("ready", () => {
  console.log(colours.fg.green, `${client.user.tag} Bot Online! \n\n`, colours.reset);
  console.log("Code Template By: Bumblebee")
  client.user.setActivity(`${config.status}`)

  client.commands = new Collection();
  client.aliases = new Collection();
  
  fs.readdir(`./${config.commandsfolder}/`, (err, files) => {
    if (err) console.error(err);
    if (files.length==0){
      console.log("=====[ Loading Commands ]=====")
      console.log("NO commands from commands folder Loaded!");
    }
    console.log(`=====[ Loading Commands - Total: ${files.length} ]=====\n`)
    console.log("|------------------------------------------|")
    files.forEach(f => {
      let props = require(`../${config.commandsfolder}/${f}`);
      console.log(colours.fg.yellow, `Walking in : ${process.cwd()}/${config.commandsfolder}/${f} \n`, colours.reset);
      console.log(colours.fg.green, `Command Name : ${props.help.name} `, colours.reset);
      console.log("|------------------------------------------|\n")

      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
    console.log(`=====[ Commands Loaded - Total: ${files.length} ]=====`)
  });

});
