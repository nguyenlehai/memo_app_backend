FROM node:14.15

WORKDIR /usr/src/app

COPY ["package*.json", "./"]

RUN npm install -g pm2

RUN npm install --silent

COPY . .

RUN npm run build

EXPOSE 5555

CMD ["npm", "run", "start:prod"]