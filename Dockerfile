# Verwende ein offizielles Node.js-Image als Basis
FROM node:24-alpine

# Arbeitsverzeichnis im Container festlegen
WORKDIR /usr/src/app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install --omit=dev

# Kopiere den Rest des Anwendungscodes
COPY . .

# Starte die Anwendung
CMD ["npm", "run", "start"]
