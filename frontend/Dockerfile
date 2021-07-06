FROM node:10 AS builder

WORKDIR /app
COPY SPA .
RUN npm install

CMD ["npm", "run-script build"]

FROM nginx:alpine
COPY --from=builder /app/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx","-g","daemon off;"]