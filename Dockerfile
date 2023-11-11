# Build
FROM node:21-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm run tsc

# Run
FROM node:21-alpine AS run

WORKDIR /usr/src/app

COPY *package*.json ./

RUN npm install --only=production

COPY --from=build /usr/src/app/out ./

ENTRYPOINT ["node", "./index.js"]