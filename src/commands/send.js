const { Modal, TextInputComponent, showModal } = require('discord-modals');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('send').setDescription('Sendet eine Nachricht an den Server!'),
    id: 'age-submit',
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const modal = new Modal()
            .setCustomId('age-modal')
            .setTitle('Age Selector')
            .addComponents(
                new TextInputComponent()
                .setCustomId('age-modal')
                .setLabel('Age Selector')
                .setStyle('SHORT')
                .setminLength(1)
                .setMaxLength(2)
                .setPlaceholder('Enter your age')
                .setRequired(true)
            );

        showModal(modal, {
            client: client,
            interaction: interaction,
        });
    },
};