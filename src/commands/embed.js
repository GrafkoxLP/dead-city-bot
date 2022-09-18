const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName("embed").setDescription("Schicke einen Embed!"),
    run: async (interaction) => {
        const modal = new Modal()
        
    }
};