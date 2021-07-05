FROM node:alpine
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY server .
COPY SPA/dist public

CMD ["npm", "start"]