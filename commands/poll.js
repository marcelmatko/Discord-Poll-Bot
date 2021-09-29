const emojiCharacters = require('../misc/emojicharacters');
const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Create a poll',
    execute(msg, args) {
        if (msg.member.hasPermission('ADMINISTRATOR')) {
            const regex = /"(.+?)"/g; let pArgs = []; let match;
            msg.delete();
            let msgArgs = args.join(' ');
            while (match = regex.exec(args)) pArgs.push(match[1]);
            if (!pArgs[0] || !pArgs[1] || !pArgs[2]) {
                let embedsay = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('ERROR')
                    .setDescription('Use right syntax')
                    .addField('Syntax:', '!poll "question" "answer 1" "answer 2" ... "answer 10"', true)
                    .setTimestamp()
                    .setFooter('Powered by Mallow', 'https://i.imgur.com/ZXApe2p.jpg');
                msg.channel.send(embedsay);
            } else {
                let options = []; let i; let counter = 1; let reactions = [];

                for (i = 1; i < pArgs.length; i++) {
                    options.push(emojiCharacters[counter] + ' ' + pArgs[i].split(",").join(" "));
                    options.push('\u200B');
                    reactions.push(emojiCharacters[counter++]);
                }
                let embedsay = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(pArgs[0].split(",").join(" "))
                    .setDescription(options)
                    .setTimestamp()
                    .setFooter('Powered by Mallow', 'https://i.imgur.com/ZXApe2p.jpg');
                msg.channel.send({ embed: embedsay }).then(embedMessage => {
                    reactions.reduce((promise, emoji) => promise.then(() => embedMessage.react(emoji)), Promise.resolve());
                });
            }

        }
        else {
            console.log(`${msg.author.username} no perms.`)
        }
    }
}
