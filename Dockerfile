FROM node:alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn
COPY . ./
CMD ["yarn", "build"]
