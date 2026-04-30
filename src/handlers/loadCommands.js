const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

const commandsDir = path.join(__dirname, '..', 'commands');

async function loadCommands(client) {
    const body = [];
    const files = fs.readdirSync(commandsDir).filter((file) => file.endsWith('.js'));

    for (const file of files) {
        const command = require(path.join(commandsDir, file));
        if (!command.data || !command.execute) {
            console.warn(`Command ${file} fehlt "data" oder "execute" und wird übersprungen.`);
            continue;
        }
        client.commands.set(command.data.name, command);
        body.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            // Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, process.env.DEV_GUILD_ID), // Slash Commands for DEV Server
            Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID), // For Global Commands
            { body },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { loadCommands };
