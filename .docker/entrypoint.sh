#!/bin/bash

npm config set cache /var/www/.npm-cache --global

cd /home/node/app

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install

nodemon -L
