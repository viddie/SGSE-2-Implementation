FROM node:10 AS builder

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "build"]

FROM nginx:alpine
COPY --from=builder /app/build /var/www
COPY --from=builder /nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx","-g","daemon off;"]