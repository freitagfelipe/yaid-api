FROM node:18.13-alpine

COPY . .

RUN npm i

EXPOSE 8080

CMD [ "npm", "start" ]