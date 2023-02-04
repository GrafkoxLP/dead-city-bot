const { SlashCommandBuilder } = require('@discordjs/builders');

const mc = new SlashCommandBuilder()
    .setName("mc")
    .setDescription("Sehe nach, ob der Dead City Server online ist");

module.exports = mc;