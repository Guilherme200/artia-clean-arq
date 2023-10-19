FROM node:18.17.0

WORKDIR /app

COPY front/package*.json .

RUN npm ci

COPY front/. /app

EXPOSE 3000

CMD [ "npm", "run", "dev" ]