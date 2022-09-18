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
    if(interaction.isChatInputCommand() && interaction.commandName === "embed") {
        const modal = new ModalBuilder()
            .setCustomID("embedModal")
            .setTitle("Embed Erstellen")

        const titleInput = new TextInputBuilder()
            .setCustomID("title")
            .setLabel("Titel")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Titel")

        const descriptionInput = new TextInputBuilder()
            .setCustomID("description")
            .setLabel("Beschreibung")
            .setStyle(TextInputStyle.Paragraph)

        const authorInput = new TextInputBuilder()
            .setCustomID("author")
            .setLabel("Autor")
            .setStyle(TextInputStyle.Short)
            .setValue("Dead City - Team")

        modal.addComponents([
            new ActionRowBuilder().addComponents(titleInput),
            new ActionRowBuilder().addComponents(descriptionInput),
            new ActionRowBuilder().addComponents(authorInput)
        ])
        await interaction.showModal(modal)

    } else if(interaction.type === InteractionType.ModalSubmit && interaction.customID === "embedModal") {
        const embed = new EmbedBuilder()
            .setTitle(interaction.fields.getTextInputValue("title"))
            .setDescription(interaction.fields.getTextInputValue("description"))
            .setAuthor({
                name: interaction.fields.getTextInputValue("author")
            })

        await interaction.reply({embeds: [embed]})
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)