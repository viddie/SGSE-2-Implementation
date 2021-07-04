FROM ubuntu:18.04

# Aktualisiere das Image
RUN apt-get update && \
 apt-get install -y curl 
 
# Installiere nodejs
RUN apt-get purge nodejs
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN echo "Node: " && node -v
RUN echo "NPM: " && npm -v

# Kopiere das Microservice Verzeichnis
COPY articleManagement /home/

# Starte die Applikation
EXPOSE 8080

CMD node /home/app.js