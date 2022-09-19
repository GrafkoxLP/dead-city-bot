require("dotenv").config()
const fs = require("fs")
const { Client, ActivityType, GatewayIntentBits, Collection, ActionRow } = require("discord.js")
const { InteractionType } = require("discord-api-types/v9")

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

client.once("ready", () => {
    console.log("Bot ist online!")
    client.user.setActivity({name: "auf Dead City", type: ActivityType.Playing})
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
                interaction.editReply({content: "There was an error while executing this command!", ephemeral: true})
            } else {
                interaction.reply({content: "There was an error while executing this command!", ephemeral: true})
            }
        }
    }
})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    
    // ! Commands
if(command === 'test') {
    message.channel.send("Test erfolgreich! **Prefix Commands** funktionieren!");
}

if(command === 'help') {
    message.channel.send("Leider funktioniert der Bot noch nicht! (Kappa)");
}

})