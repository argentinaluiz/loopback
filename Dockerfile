# Check out https://hub.docker.com/_/node to select a new base image
FROM node:12.14.0-alpine3.11

RUN apk add --no-cache bash

RUN touch /root/.bashrc | echo "PS1='\w\$ '" >> /root/.bashrc

RUN npm install -g @loopback/cli@2.3.0
RUN npm install -g nodemon

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /home/node/app

#COPY package*.json ./
#CMD [ "nodemon","-L", "-w","./home/node/app" ]
#CMD [ "npm", "start"]
#ENV HOST=0.0.0.0 PORT=3000
#
#EXPOSE ${PORT}
#CMD [ "node", "." ]
#COPY .docker/entrypoint.sh /entrypoint.sh
#ENTRYPOINT ["/entrypoint.sh"]
