# Check out https://hub.docker.com/_/node to select a new base image
FROM node:12.14.0-alpine3.11

RUN apk add --no-cache bash

RUN touch /root/.bashrc | echo "PS1='\w\$ '" >> /root/.bashrc

RUN npm install -g @loopback/cli@2.3.0
RUN npm install -g nodemon

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
