FROM nginx:alpine
COPY SPA/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3001
ENTRYPOINT ["nginx","-g","daemon off;"]