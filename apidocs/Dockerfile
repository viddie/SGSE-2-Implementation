FROM node:8
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

# Starte die Applikation
EXPOSE 8080

CMD ["npm", "start"]