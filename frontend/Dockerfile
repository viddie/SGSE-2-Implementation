FROM node:alpine
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY server .
COPY SPA/dist/App.js public
COPY SPA/dist/index.html views

CMD ["npm", "start"]