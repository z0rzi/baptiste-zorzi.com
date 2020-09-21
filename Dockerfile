FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
VOLUME /etc/letsencrypt/live/baptiste-zorzi.com/
RUN yarn
RUN yarn build
EXPOSE 443
EXPOSE 80
CMD ["yarn", "start:prod"]
