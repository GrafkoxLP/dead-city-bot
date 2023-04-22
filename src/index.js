const { Client, ActivityType, GatewayIntentBits, Collection, ActionRow, EmbedBuilder, Routes, PermissionsBitField, ModalBuilder, TextInputStyle } = require("discord.js")
const { REST } = require('@discordjs/rest');
const prefix = '!';
const welcome_channel = '940232290628419649'
require("dotenv").config()

// Import all the commands
const pingCommand = require("./commands/ping.js")
const rules = require("./commands/rules.js")
const mc = require("./commands/mc.js");
const notification_roles = require("./commands/notification_roles.js");
const bewerbung_info = require("./commands/bewerbung_info.js");
const { ActionRowBuilder, TextInputAssertions, TextInputBuilder } = require("@discordjs/builders");

// Channel IDs for Support System
const supportMessageChannel = '1096516245186166824';
const supportVoiceChannel = '940588586921758770';

const client = new Client({intents: [
	GatewayIntentBits.Guilds,
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
    GatewayIntentBits.GuildScheduledEvents]});
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
registerCommands();
client.login(process.env.DISCORD_BOT_TOKEN);
// Status Array
const statusArray = [
    {
        name: "mit (/) Commands",
        type: ActivityType.Playing,
        statusbar: "online"
    },
    {
        name: "/help | Dead City",
        type: ActivityType.Playing,
        statusbar: "online"
    }
];
async function pickPresence() {
    const option = Math.floor(Math.random() * statusArray.length);

    try {
        await client.user.setActivity({
            name: statusArray[option].name,
            type: statusArray[option].type,
            status: statusArray[option].statusbar
        })
    } catch (error) {
        console.error(error);
    }
};
setInterval(pickPresence, 30 * 1000);
client.on("ready", () => {
    console.log("Bot is ready!");
});
async function registerCommands() {
    const commands = [pingCommand, rules, mc, notification_roles, bewerbung_info];
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            //Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, process.env.DEV_GUILD_ID), // Slash Commands for DEV Server
            Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID), //For Global Commands
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

//When someone joines a specific voice channel send a message to a specific channel
client.on('voiceStateUpdate', (oldState, newState) => {
    const member = newState.member;
    const channel = newState.channel;

    // Prüfen, ob der User den spezifischen Voicechannel gejoint hat
    if (channel?.id === supportVoiceChannel) {
        // Nachricht in den Zielchannel senden
        const targetChannel = client.channels.cache.get(supportMessageChannel);
        targetChannel.send(`Hey <@&940232290129301547>, <@&1091462754696696010>, <@&1062080912390627380>! *${member.displayName}* ist nun im Support Warteraum!`);
    }
});

//Send Welcome Message
client.on('guildMemberAdd', (member) => {
    const message = "Hey <@" +member.user+ "> Herzlich willkommen auf **Dead City**! 🎉🤗\nGehe bitte zu <#940232290628419650> und bestätige sie bitte mit ✅.\nDu kannst dir außerdem in <#940232290628419652> eigene Rollen geben."
    const channel = member.guild.channels.cache.get(welcome_channel)
    channel.send(message)
    member.send("Hey <@" +member.user+ ">! Das ganze Team von **Dead City** wünscht dich noch einmal herzlich willkommen auf unserem Server und wir wünschen dir viel Spaß.\nFalls du es noch nicht gesehen hast, um unserem Server zu joinen, gehe bitte zu <#940232290628419650> und bestätige unsere Regeln bitte mit ✅.\nBei Fragen kannst du unter <#1076595592647684166> ein Ticket erstellen.")
})

// Message Logger
client.on('messageCreate', (message) => {
    console.log('---------------------');
    console.log('Message: ' + message.content);
    console.log(message.createdAt.toDateString());
    console.log(message.author.tag);
    console.log('---------------------');
})

// Commands
client.on('interactionCreate', (interaction) => {
    if (interaction.commandName === 'ping') {
        interaction.reply({content: `🏓 | Ping beträgt **${client.ws.ping} ms**!`, ephemeral: true});
    }
    if (interaction.commandName === 'kopfoderzahl') {
        const random = Math.floor(Math.random() * 2);
        if (random == 0) {
            interaction.reply({content: 'Die Münze landet auf Kopf'});
        } else {
            interaction.reply({content: 'Die Münze landet auf Zahl'});
        }
    }
    if (interaction.commandName === 'rules') {
        if (interaction.member.roles.cache.some(role => role.name === '🔴 | [Owner]')) {
            const embed = new EmbedBuilder()
                .setColor('DARK_BLUE')
                .setTitle('Dead City Regeln')
                .setURL('https://dead-city.grafkox.de')
                .setAuthor({ name: 'Dead City', iconURL: client.user.displayAvatarURL(), url: 'https://dead-city.grafkox.de/bot/' })
                .setThumbnail('https://dead-city.grafkox.de/assets/cut.png')
                .addFields(
                    { name: 'Discord Server', value: '**1.** User müssen sich an die TOS von Discord halten.\n**2.** Jeder Nutzer hat das Recht respektvoll behandelt zu werden. Die Verletzung dieses Rechts kann zu Konsequenzen führen.\n**3.** Den Anweisungen von Teammitgliedern ist stets Folge zu leisten.\n**4.** Administratoren haben immer das letzte Wort.\n**5.** Das anschreiben von Teammitgliedern ist verboten! Wenn ihr Hilfe braucht, könnt ihr im <#940232291018473491> ein Ticket aufmachen!\n**6.** Unabgesprochene Eigenwerbung ist verboten und kann bestraft werden.\n**7.** Das grundlose Pingen / Markieren von Nutzern ist untersagt.\n**8.** NSFW-Inhalte sind in allen Channeln strengstens verboten.\n**9.** Spammen ist verboten.\n**10.** Trolling ist in Sprach- sowie Textchanneln verboten.' },
                    { name: 'Minecraft Server', value: '**1.** Schummeln ist verboten! Darunter versteht man alles, was Vorteile gegenüber anderen bietet, wie z.B. X-Ray, Fly, AutoBuild, AutoClicker, oder ähnliches wie Bugs ausnutzen.\n**2.** Spammen von Nachrichten ist verboten und kann bestraft werden.\n**3.** Griefen oder Trollen jeglicher Art ist strengstens verboten und wird normalerweise mit einem 7 Tage Bann bestraft. Dazu gehört z.B. jegliche Blöcke abbauen von anderen Spielern, Items aus Kisten klauen, Villager von Spielern töten, ...\nIn Supportfällen werden nur Items erstattet, wenn ihr einen Clip habt, der beweisen kann, dass ihr gegrieft oder getrollt wurdet!\n**4.** Ihr dürft andere Spieler angreifen und die Items behalten, die der Spieler bei seinem Tot gedroppt hat. Danach geht ihr von der gegnerischen Basis weg und tötet nicht nocheinmal den Spieler, es sei denn dieser greift euch zuerst wieder an.\n**5.** Jegliche Versuche, die Performance des Servers zu mindern sind strengstens verboten.' },
                )
                .setFooter({ text: 'Bot made by Grafkox_LP#7287', iconURL: 'https://cdn.discordapp.com/avatars/455285844350074881/d0b66b726036730c61206600c69c82e4.png?size=2048' });
            interaction.reply({embeds: [embed]});
        }
        else {
            interaction.reply({content: 'Du hast nicht die Berechtigung diesen Command zu nutzen!', ephemeral: true});
        }
    }
    if (interaction.commandName === 'mc') {
        const mc = require('minecraft-server-util');
        mc.status('play.grafkox.de')
        .then((response) => {
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
            interaction.reply({embeds: [embed]});
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
            interaction.reply({embeds: [embed]});
        });
    }
    if (interaction.commandName === 'message') {
        //create modal
        const modal = new ModalBuilder()
            .setTitle('Message')
            .setCustomId('message')
            .setComponents(
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel('message')
                        .setCustomId('message')
                        .setStyle(TextInputStyle.Short)
                )
            );

        message.channel.send(modal).then(modalMessage => {
        targetChannel.send(inputValue);
        });
    }
    if (interaction.commandName === 'notification_roles') {
        if (interaction.member.roles.cache.some(role => role.name === '🔴 | [Owner]')) {
            const embed = new EmbedBuilder()
                .setColor('DARK_BLUE')
                .setTitle('Dead City Notification Roles')
                .setURL('https://dead-city.grafkox.de')
                .setAuthor({ name: 'Dead City', iconURL: client.user.displayAvatarURL(), url: 'https://dead-city.grafkox.de/bot/' })
                .setThumbnail('https://dead-city.grafkox.de/assets/cut.png')
                .addFields(
                    { name: 'Gewinnspiel - Notification', value: 'Reagiere mit 🎉, um bei neuen Gewinnspielen benachrichtigt zu werden!' },
                    { name: 'Server Updates - Notification', value: 'Reagiere mit ⚙️, um benachrichtigt zu werden, wenn es ein Update zum Server gibt!' },
                    { name: 'Twitch - Notification', value: 'Reagiere mit 🎥, um benachrichtigt zu werden, wenn wir live auf Twitch sind!' },
                )
                .setFooter({ text: 'Bot made by Grafkox_LP#7287', iconURL: 'https://cdn.discordapp.com/avatars/455285844350074881/d0b66b726036730c61206600c69c82e4.png?size=2048' });
            interaction.reply({embeds: [embed]});
        }
    }
    if (interaction.commandName === 'bewerbung_info') {
        if (interaction.member.roles.cache.some(role => role.name === '🔴 | [Owner]')) {
            const embed = new EmbedBuilder()
                .setColor('DARK_BLUE')
                .setTitle('Dead City Bewerbung')
                .setURL('https://dead-city.grafkox.de')
                .setAuthor({ name: 'Dead City', iconURL: client.user.displayAvatarURL(), url: 'https://dead-city.grafkox.de/bot/' })
                .setThumbnail('https://dead-city.grafkox.de/assets/cut.png')
                .addFields(
                    { name: 'Was in deiner Bewerbung enthalten sein sollte', value: '- Information über deine Person\n- Warum möchtest du ausgerechnet Dead City unterstützen?\n- Warum sollten wir dich auswählen?\n- Welche Erfahrungen hast du bereits?\n- Was sind deine Stärken und Schwächen?' },
                    { name: 'Was sind die Vorraussetzungen', value: '- Mindestalter: 16 Jahre\n- Respektvoller Umgangston\n- Verständliches und deutliches Mikrofon' },
                )
                .setFooter({ text: 'Bot made by Grafkox_LP#7287', iconURL: 'https://cdn.discordapp.com/avatars/455285844350074881/d0b66b726036730c61206600c69c82e4.png?size=2048' });
            interaction.reply({embeds: [embed]});
        }
    }
});


// Command Handler for !message and !dm
client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    
// Commands - (Prefix: !)
if(command === 'dm') {
    if(message.member.roles.cache.some(role => role.name === '🔴 | [Owner]')) {
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
    } else {
        message.channel.send("Du hast nicht die Berechtigung diesen Befehl zu nutzen!");
    }
}

if(command === 'message') {
    if(message.member.roles.cache.some(role => role.name === '🔴 | [Owner]')) {
        // sendet eine Nachricht in einen Channel (Format: !message #channel Nachricht)
        const channel = message.mentions.channels.first();
        if(channel) {
            channel.send(argument.join(" ").slice(22));
        } else {
            message.channel.send("Du hast keinen Channel angegeben!");
        }
    } else {
        message.channel.send("Du hast nicht die Berechtigung diesen Befehl zu nutzen!");
    }
}
});