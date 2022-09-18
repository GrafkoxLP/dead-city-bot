require("dotenv").config()
const fs = require("fs")
const { Client, ActivityType, GatewayIntentBits, Collection, ActionRow } = require("discord.js")
const { InteractionType } = require("discord-api-types/v9")

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.GuildScheduledEvents]})
client.commands = new Collection()

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))


commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})

client.once("ready", () => {
    console.log("Bot is up!")
    client.user.setActivity({name: "zu, wie ich entwickelt werde.", type: ActivityType.Watching})
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

client.login(process.env.DISCORD_BOT_TOKEN)