const { Events } = require('discord.js');
const { welcomeChannelId } = require('../config');

module.exports = {
    name: Events.GuildMemberAdd,

    execute(member) {
        const channel = member.guild.channels.cache.get(welcomeChannelId);
        channel?.send(`Hey <@${member.id}> Herzlich willkommen auf **Dead City**! 🎉🤗\nLies dir bitte in <#940232290628419650> die Regeln durch.`);

        member.send(`Hey <@${member.id}>! Das ganze Team von **Dead City** wünscht dich noch einmal herzlich willkommen auf unserem Server und wir wünschen dir viel Spaß.\nBei Fragen kannst du unter <#1076595592647684166> ein Ticket erstellen.`);
    },
};
