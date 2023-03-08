FROM node:18.14.2-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g @angular/cli && npm install

COPY . ./

EXPOSE 4500

CMD ["npm", "dev"]
