FROM node:20-alpine

WORKDIR /app

COPY package.json .
RUN rm -rf node_modules
RUN yarn cache clean
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]