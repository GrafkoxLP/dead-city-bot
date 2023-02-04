const { SlashCommandBuilder } = require('@discordjs/builders');

const rules = new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Sendet die Regeln des Servers");

module.exports = rules;