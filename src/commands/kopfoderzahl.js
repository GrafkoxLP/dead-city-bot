const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kopfoderzahl')
        .setDescription('Kopf oder Zahl? Lass die Münze entscheiden!'),

    async execute(interaction) {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
            await interaction.reply({ content: 'Die Münze landet auf Kopf' });
        } else {
            await interaction.reply({ content: 'Die Münze landet auf Zahl' });
        }
    },
};
