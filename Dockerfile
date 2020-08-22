FROM node:current-slim

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

COPY package.json .

RUN npm install

EXPOSE 3010

CMD [ "npm", "start" ]