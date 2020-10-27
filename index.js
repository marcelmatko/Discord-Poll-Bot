const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require("./config.json");
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on(`message`, msg => {
    if (msg.content.startsWith(`${prefix}poll`)) {
        const args = msg.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        client.commands.get(command).execute(msg, args);
    }
   
});


client.login(token);

/* MARCEL MATKO */