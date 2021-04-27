FROM node:alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY colors.js ./
COPY postcss.config.js ./
COPY tailwind.js ./
COPY config-overrides.js ./
COPY tsconfig.json ./
COPY screensize.js ./
COPY tsconfig.paths.json ./
RUN mkdir public
COPY public ./public
RUN mkdir src
COPY src ./src
RUN ls
RUN yarn build
