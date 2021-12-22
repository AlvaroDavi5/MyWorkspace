
FROM node:alpine
LABEL Description="Docker Image for NodeJS"
#MAINTAINER Alvaro alvaro.davsa@gmail.com
LABEL org.opencontainers.image.authors="alvaro.davsa@gmail.com"
ENV Version="1.0.0"

WORKDIR /home/node/MyWorkspace
USER root

COPY package*.json *.lock ./
RUN yarn install
COPY ./ ./
RUN pwd && ls -a
CMD [ "npm", "run", "db_config", " && ", "npm", "run", "dev" ]

VOLUME [ ".docker/docker_containers:/app" ]
EXPOSE 8080
#ENTRYPOINT ["/usr/bin/node", "-D", "FOREGROUND"]
