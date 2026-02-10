FROM node:25

COPY package.json /app/
COPY tsconfig.json /app/
COPY src /app/src/

WORKDIR /app

RUN npm install
RUN npm run build

COPY .env /app/dist
WORKDIR /app/dist

CMD ["node", "--env-file=.env", "app.js"]