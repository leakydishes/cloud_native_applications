# syntax=docker/dockerfile:1.4
FROM node:16-slim AS development

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
