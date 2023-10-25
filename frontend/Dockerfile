FROM node:20.8.1-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn;
COPY . .
CMD [ "yarn", "dev" ]
