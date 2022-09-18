require("dotenv").config()
const { Client, ActivityType, GatewayIntentBits } = require("discord.js")

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.GuildScheduledEvents]})

client.once("ready", () => {
    console.log("Bot is up!")
    client.user.setActivity({name: "zu, wie ich entwickelt werde.", type: ActivityType.Watching})
})

client.login(process.env.DISCORD_BOT_TOKEN)