const { Events } = require('discord.js');
const { prefix } = require('../config');
const { isOwner } = require('../utils/isOwner');

function handleDm(message, args) {
    if (!isOwner(message.member)) {
        message.channel.send('Du hast nicht die Berechtigung diesen Befehl zu nutzen!');
        return;
    }

    const user = message.mentions.users.first();
    if (!user) {
        message.channel.send('Du hast keinen User angegeben!');
        return;
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
        message.channel.send('Der User ist nicht auf diesem Server!');
        return;
    }

    member.send(args.join(' '));
    message.channel.send('Nachricht erfolgreich gesendet!');
}

function handleMessage(message, args) {
    if (!isOwner(message.member)) {
        message.channel.send('Du hast nicht die Berechtigung diesen Befehl zu nutzen!');
        return;
    }

    const channel = message.mentions.channels.first();
    if (!channel) {
        message.channel.send('Du hast keinen Channel angegeben!');
        return;
    }

    // slice(22) entfernt die Channel-Mention `<#…>` plus Leerzeichen aus dem
    // Anfang. Brittle: stimmt nur für 18-stellige IDs, wird bei 19-stelligen
    // IDs ein Zeichen zu wenig entfernen. Verhalten 1:1 aus dem Original.
    channel.send(args.join(' ').slice(22));
}

module.exports = {
    name: Events.MessageCreate,

    execute(message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const messageArray = message.content.split(' ');
        const command = messageArray[0].slice(prefix.length).toLowerCase();
        const args = messageArray.slice(1);

        if (command === 'dm') {
            handleDm(message, args);
        } else if (command === 'message') {
            handleMessage(message, args);
        }
    },
};
