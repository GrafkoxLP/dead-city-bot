const { SlashCommandBuilder } = require('@discordjs/builders');

const notification_roles = new SlashCommandBuilder()
    .setName("notification_roles")
    .setDescription("Sendet die Nachticht für die Notification-Roles");

module.exports = notification_roles;