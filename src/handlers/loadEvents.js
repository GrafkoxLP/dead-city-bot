const fs = require('node:fs');
const path = require('node:path');

const eventsDir = path.join(__dirname, '..', 'events');

function loadEvents(client) {
    const files = fs.readdirSync(eventsDir).filter((file) => file.endsWith('.js'));

    for (const file of files) {
        const event = require(path.join(eventsDir, file));
        if (!event.name || !event.execute) {
            console.warn(`Event ${file} fehlt "name" oder "execute" und wird übersprungen.`);
            continue;
        }

        const handler = (...args) => event.execute(...args, client);
        if (event.once) {
            client.once(event.name, handler);
        } else {
            client.on(event.name, handler);
        }
    }
}

module.exports = { loadEvents };
