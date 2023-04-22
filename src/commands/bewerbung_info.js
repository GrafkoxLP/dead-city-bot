const { SlashCommandBuilder } = require('@discordjs/builders');

const bewerbung_info = new SlashCommandBuilder()
    .setName("bewerbung_info")
    .setDescription("Sendet die Infos für die Bewerbung");

module.exports = bewerbung_info;