
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn
RUN yarn build
RUN cp -f .server.pem ./node_modules/webpack-dev-server/ssl/server.pem
EXPOSE 5000
CMD ["yarn", "run", "serve", "build"]
