const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createBrandedEmbed } = require('../utils/embed');
const { isOwner } = require('../utils/isOwner');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bewerbung_info')
        .setDescription('Sendet die Infos für die Bewerbung')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        if (!isOwner(interaction.member)) return;

        const embed = createBrandedEmbed(client)
            .setTitle('Dead City Bewerbung')
            .addFields(
                { name: 'Was in deiner Bewerbung enthalten sein sollte', value: '- Information über deine Person\n- Warum möchtest du ausgerechnet Dead City unterstützen?\n- Warum sollten wir dich auswählen?\n- Welche Erfahrungen hast du bereits?\n- Was sind deine Stärken und Schwächen?' },
                { name: 'Was sind die Vorraussetzungen', value: '- Mindestalter: 16 Jahre\n- Respektvoller Umgangston\n- Verständliches und deutliches Mikrofon' },
            );

        await interaction.reply({ embeds: [embed] });
    },
};
