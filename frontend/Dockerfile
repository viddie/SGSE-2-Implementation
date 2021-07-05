FROM node:alpine
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY server .
COPY SPA/dist/App.js dist

CMD ["npm", "start"]