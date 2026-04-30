const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Zeigt dir den aktuellen Ping an'),

    async execute(interaction, client) {
        await interaction.reply({
            content: `🏓 | Ping beträgt **${client.ws.ping} ms**!`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
