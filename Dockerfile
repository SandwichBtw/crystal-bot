# Build
FROM node:21-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run tsc

# Run
FROM node:21-alpine AS run

WORKDIR /usr/src/app

COPY *package*.json ./

RUN npm install --omit=dev

COPY --from=build /usr/src/app/out ./

ENTRYPOINT ["node", "./index.js"]