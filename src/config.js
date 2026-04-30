const { ActivityType } = require('discord.js');

module.exports = {
    prefix: '!',
    ownerRoleId: '940232290129301551',

    welcomeChannelId: '940232290628419649',
    supportVoiceChannelId: '940588586921758770',
    supportMessageChannelId: '1096516245186166824',
    supportPingRoleIds: ['940232290129301547', '1091462754696696010', '1062080912390627380'],

    mcHost: 'play.grafkox.de',

    embedBranding: {
        color: '#206694',
        websiteUrl: 'https://dead-city.grafkox.de',
        botPathUrl: 'https://dead-city.grafkox.de/bot/',
        thumbnailUrl: 'https://dead-city.grafkox.de/assets/cut.png',
        authorName: 'Dead City',
        footerText: 'Bot made by @grafkox_lp',
        footerIconUrl: 'https://cdn.discordapp.com/avatars/455285844350074881/e799202175df16a29598e9e8969dfb52.png?size=2048',
    },

    statusArray: [
        { name: 'mit (/) Commands', type: ActivityType.Playing, status: 'online' },
        { name: '/help | Dead City', type: ActivityType.Playing, status: 'online' },
    ],
};
