const { Events } = require('discord.js');
const { supportVoiceChannelId, supportMessageChannelId, supportPingRoleIds } = require('../config');

module.exports = {
    name: Events.VoiceStateUpdate,

    execute(oldState, newState, client) {
        const member = newState.member;
        const channel = newState.channel;

        if (channel?.id !== supportVoiceChannelId) return;

        const targetChannel = client.channels.cache.get(supportMessageChannelId);
        const rolePings = supportPingRoleIds.map((id) => `<@&${id}>`).join(', ');
        targetChannel?.send(`Hey ${rolePings}! *${member.displayName}* ist nun im Support Warteraum!`);
    },
};
