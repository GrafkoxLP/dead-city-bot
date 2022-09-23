// Load all files and conntect bot
require("dotenv").config()
const fs = require("fs")
const { Client, ActivityType, GatewayIntentBits, Collection, ActionRow, EmbedBuilder } = require("discord.js")
const { InteractionType } = require("discord-api-types/v9")
const welcome_channel = '940232290628419649'
const log_channel = '940232291488268366'
const prefix = '!';
const client = new Client({intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents]})
client.commands = new Collection()
client.login(process.env.DISCORD_BOT_TOKEN)
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))
commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    const command = client.commands.get(interaction.commandName)
    if (command) {
        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            
            if(interaction.deferred || interaction.replied) {
                interaction.editReply({content: "There was an error while executing this command!", ephemeral: true});
                console.log("Fehler beim Ausführen eines Befehls")
            } else {
                interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
                console.log("Fehler beim Ausführen eines Befehls")
            }
        }
    }
})
client.once("ready", () => {
    console.log("Bot ist online!")
    client.user.setActivity({name: "auf Dead City", type: ActivityType.Playing})
})
client.on('guildMemberAdd', (member) => {
    const message = "Hey <@" +member.user+ "> Herzlich willkommen auf **Dead City**! 🎉🤗\nGehe bitte zu <#940232290628419650> und bestätige sie bitte mit ✅.\nDu kannst dir außerdem in <#940232290628419652> eigene Rollen geben."
    const channel = member.guild.channels.cache.get(welcome_channel)
    channel.send(message)
    member.send("Hey <@" +member.user+ ">! Das ganze Team von **Dead City** wünscht dich noch einmal herzlich willkommen auf unserem Server und wir wünschen dir viel Spaß.\nFalls du es noch nicht gesehen hast, um unserem Server zu joinen, gehe bitte zu <#940232290628419650> und bestätige unsere Regeln bitte mit ✅.\nBei Fragen kannst du unter <#940232291018473491> ein Ticket erstellen.")
})
client.on("guildMemberRemove", (member) => {
    const channel = member.guild.channels.cache.get(log_channel)
    channel.send('Der User <@' +member.user+ '> hat den Server verlassen!');
});




// Message Logger
client.on('messageCreate', (message) => {
    console.log('---------------------');
    console.log('Message: ' + message.content);
    console.log(message.createdAt.toDateString());
    console.log(message.author.tag);
    console.log('---------------------');
})


// Command Handler
client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    
    // Commands - (Prefix: !)
if(command === 'test') {
    message.channel.send("Test erfolgreich! **Prefix Commands** funktionieren!");
}

if(command === 'dm') {
    // sendet einem User eine DM (Format: !dm @User Nachricht)
    const user = message.mentions.users.first();
    if(user) {
        const member = message.guild.members.cache.get(user.id);
        if(member) {
            member.send(argument.join(" "));
            message.channel.send("Nachricht erfolgreich gesendet!");
        } else {
            message.channel.send("Der User ist nicht auf diesem Server!");
        }
    } else {
        message.channel.send("Du hast keinen User angegeben!");
    }
}

if(command === 'message') {
    if(message.member.roles.cache.some(role => role.name === '🔴 | Projektleitung')) {
        // sendet eine Nachricht in einen Channel (Format: !message #channel Nachricht)
        const channel = message.mentions.channels.first();
        if(channel) {
            channel.send(argument.join(" ").slice(22));
            message.channel.send("Nachricht erfolgreich gesendet!");
        } else {
            message.channel.send("Du hast keinen Channel angegeben!");
        }
    } else {
        message.channel.send("Du hast nicht die Berechtigung diesen Befehl zu nutzen!");
    }
}

if(command === 'clear') {
    if(message.member.roles.cache.some(role => role.name === '🔴 | Projektleitung')) {
        // löscht eine Nachricht (Format: !clear Anzahl)
        if(!args[0]) return message.reply("Bitte gebe eine Anzahl an!");
        message.channel.bulkDelete(args[0]);
    } else {
        message.channel.send("Du hast nicht die Berechtigung diesen Befehl zu nutzen!");
    }
}

if(command === 'clearall'){
    if(message.member.roles.cache.some(role => role.name === '🔴 | Projektleitung')) {
        // löscht alle Nachrichten (Format: !clearall)
        message.channel.bulkDelete(100);
    } else {
        message.channel.send("Du hast nicht die Berechtigung diesen Befehl zu nutzen!");
    }
}

if(command === 'mc') {
    // prüft ob der Minecraft Server online ist (Format: !mc)
    const mc = require('minecraft-server-util');
    mc.status('play.grafkox.de')
    .then((response) => {
        // sende eine embed Nachricht
        const embed = new EmbedBuilder()
            .setColor('DARK_BLUE')
            .setTitle('Dead City Minecraft Server')
            .setURL('https://dead-city.grafkox.de')
            .setAuthor({ name: 'Dead City', iconURL: client.user.displayAvatarURL(), url: 'https://dead-city.grafkox.de/bot/' })
            .setThumbnail('https://dead-city.grafkox.de/assets/cut.png')
            .addFields(
                { name: 'Server Status', value: 'Der Server ist aktuell **online** :white_check_mark:' },
                { name: 'Server IP', value: '*play.grafkox.de*', inline: true },
                { name: 'Website', value: '*dead-city.grafkox.de*', inline: true },
            )
            .setFooter({ text: 'Bot made by Grafkox_LP#7287', iconURL: 'https://cdn.discordapp.com/avatars/455285844350074881/d0b66b726036730c61206600c69c82e4.png?size=2048' });
        message.channel.send({ embeds: [embed] });
    })
    .catch((error) => {
        const embed = new EmbedBuilder()
            .setColor('DARK_BLUE')
            .setTitle('Dead City Minecraft Server')
            .setURL('https://dead-city.grafkox.de')
            .setAuthor({ name: 'Dead City', iconURL: client.user.displayAvatarURL(), url: 'https://dead-city.grafkox.de/bot/' })
            .setThumbnail('https://dead-city.grafkox.de/assets/cut.png')
            .addFields(
                { name: 'Server Status', value: 'Der Server ist aktuell **offline** :x:\n\nSollte das Problem weiterhin bestehen kontaktiere bitte einen Administrator' },
                { name: 'Server IP', value: '*play.grafkox.de*', inline: true },
                { name: 'Website', value: '*dead-city.grafkox.de*', inline: true },
            )
            .setFooter({ text: 'Bot made by Grafkox_LP#7287', iconURL: 'https://cdn.discordapp.com/avatars/455285844350074881/d0b66b726036730c61206600c69c82e4.png?size=2048' });
        message.channel.send({ embeds: [embed] });
    });
}

if(command === 'help') {
    // sendet eine Hilfe Nachricht
    const embed = new EmbedBuilder()
        .setColor('DARK_BLUE')
        .setTitle('Dead City Bot Hilfe')
        .setURL('https://dead-city.grafkox.de')
        .setAuthor({ name: 'Dead City', iconURL: client.user.displayAvatarURL(), url: 'https://dead-city.grafkox.de/bot/' })
        .setThumbnail('https://dead-city.grafkox.de/assets/cut.png')
        .addFields(
            { name: 'Prefix', value: '*!*' },
            { name: 'Commands', value: '\n!test\n!dm\n!message\n!clear\n!clearall\n!mc\n!help\n!inv\n' },
        )
        .setFooter({ text: 'Bot made by Grafkox_LP#7287', iconURL: 'https://cdn.discordapp.com/avatars/455285844350074881/d0b66b726036730c61206600c69c82e4.png?size=2048' });
    message.channel.send({ embeds: [embed] });
}

if(command === 'inv'){
    // delete command message
    message.delete();

    //create a new invite link and send it to the user via dm
    message.channel.createInvite({maxAge: 0, maxUses: 0}).then(invite => {
        message.author.send('Hier ist dein Invite Link:\nhttps://discord.gg/VEZQzXA73P');
    });
}
})