# Dead-City-Bot

Discord-Bot für den Dead-City-Server, gebaut mit [discord.js](https://discord.js.org/).

## Features

| Slash-Command | Beschreibung | Berechtigung |
|---|---|---|
| `/ping` | Aktuelle Bot-Latenz anzeigen | jeder |
| `/mc` | Status des Minecraft-Servers (`play.grafkox.de`) abfragen | jeder |
| `/kopfoderzahl` | Eine Münze werfen | jeder |
| `/rules` | Server-Regeln als Embed posten | nur Owner |
| `/bewerbung_info` | Bewerbungs-Infos als Embed posten | nur Owner |

| Prefix-Command | Beschreibung |
|---|---|
| `!dm @user <text>` | Schickt `<text>` als DM an den erwähnten User (Owner-only) |
| `!message #channel <text>` | Schickt `<text>` in den erwähnten Channel (Owner-only) |

Außerdem:
- Begrüßt neue Mitglieder automatisch im Welcome-Channel + per DM.
- Pingt das Support-Team, sobald jemand den Support-Warteraum betritt.
- Rotiert seine Discord-Status-Aktivität alle 30 Sekunden.

## Setup (lokal)

Voraussetzung: **Node.js 24** (LTS Krypton) oder neuer.

```bash
# 1. Repo klonen
git clone https://github.com/GrafkoxLP/muffi-bot.git
cd muffi-bot

# 2. Environment-Variablen anlegen
cp .env.example .env
# anschließend .env öffnen und Werte eintragen (siehe unten)

# 3. Dependencies installieren
npm install

# 4. Bot starten
npm start
```

Für Live-Reload während der Entwicklung: `npm run dev`.

## Setup (Docker)

```bash
docker build -t dead-city-bot .
docker run --rm --env-file .env dead-city-bot
```

Das im Repo enthaltene GitHub-Actions-Workflow [docker-image.yml](.github/workflows/docker-image.yml) baut bei jedem Push auf `main` automatisch ein Image und pusht es nach GHCR.

## Environment-Variablen

| Variable | Beschreibung | Pflicht |
|---|---|---|
| `DISCORD_BOT_TOKEN` | Bot-Token aus dem Discord Developer Portal | ja |
| `DISCORD_APPLICATION_ID` | Application-ID des Bots | ja |
| `DEV_GUILD_ID` | Falls gesetzt UND in [src/handlers/loadCommands.js](src/handlers/loadCommands.js) der entsprechende Routes-Aufruf einkommentiert wird, registrieren sich die Slash-Commands sofort auf diesem Test-Server statt global | nein |

Token und Application-ID findest du im [Discord Developer Portal](https://discord.com/developers/applications) unter deiner Application: ID auf der Seite *General Information*, Token unter *Bot* → *Reset Token*.

## Projektstruktur

```
src/
├── index.js                 # Entry: Client, Login, Loader-Aufrufe, Error-Handler
├── config.js                # IDs, Owner-Rolle, Branding, Status-Array
├── utils/
│   ├── embed.js             # createBrandedEmbed(client) → vorbefüllter EmbedBuilder
│   └── isOwner.js           # Role-ID-basierter Owner-Check
├── commands/                # Slash-Commands ({ data, execute })
├── events/                  # Event-Handler ({ name, once?, execute })
└── handlers/                # Auto-Discovery für commands/* und events/*
```

Neue Slash-Commands oder Events können einfach als Datei in `src/commands/` bzw. `src/events/` abgelegt werden und werden beim nächsten Bot-Start automatisch geladen.

## Lizenz

ISC
