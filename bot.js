const Discord = require('discord.js');
const client = new Discord.Client({DisableEveryone:true});
const { exec } = require("child_process");

client.on('ready', ()=>{
client.user.setActivity("with tts and shit");
console.log("ready!");
});

let ttsOn = true;

client.on('message', async m => {
  if(m.author.bot) return;
  if(m.content.indexOf("!") !== 0) return;

  const args = m.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  switch(command) {
	case "tts":
		if(ttsOn == false) return;
		console.log(`${new Date().toTimeString()}: (user: ${m.author.tag}): ${m.content}`)
		exec('espeak \"'+args.join(" ").replace(/\"/ig, "\'")+'\"', (e, sto, ste) => {});
	break;
	case "toggletts":
		if(m.author.id !== "") return; // Put your user ID here!
		ttsOn = !ttsOn;
	break;
	case "fuck_you":
		if(m.author.id !== "") return; // Put your user ID here!
		exec("killall sox");
		exec("killall curl");
		exec("killall lame");
	break;
	case "mp3":
		if(m.attachments.array().length == 0) return;
		const url = m.attachments.first().url;
		if(!url.endsWith(".mp3")) return m.channel.send("not an mp3");
		exec('curl -s "' + url + '" | lame --mp3input --decode - - | sox -twav - -d');
	break;
  }
});

client.login(""); // Put a valid bot token here.
