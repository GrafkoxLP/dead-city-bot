const { EmbedBuilder } = require('discord.js');
const { embedBranding } = require('../config');

function createBrandedEmbed(client) {
    return new EmbedBuilder()
        .setColor(embedBranding.color)
        .setURL(embedBranding.websiteUrl)
        .setAuthor({
            name: embedBranding.authorName,
            iconURL: client.user.displayAvatarURL(),
            url: embedBranding.botPathUrl,
        })
        .setThumbnail(embedBranding.thumbnailUrl)
        .setFooter({
            text: embedBranding.footerText,
            iconURL: embedBranding.footerIconUrl,
        });
}

module.exports = { createBrandedEmbed };
