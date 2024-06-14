# Verwende ein offizielles Node.js-Image als Basis
FROM node:20.14.0

# Arbeitsverzeichnis im Container festlegen
WORKDIR /usr/src/app

# Kopiere package.json und package-lock.json (falls vorhanden)
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Anwendungscodes
COPY . .

# Starte die Anwendung
CMD ["npm", "run", "start"]