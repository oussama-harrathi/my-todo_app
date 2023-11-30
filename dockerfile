# Build the application
FROM node:16 AS build

WORKDIR /MY-APP

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Setup the runtime environment
FROM node:16

WORKDIR /MY-APP

COPY --from=build /MY-APP/build ./build
COPY --from=build /MY-APP/node_modules ./node_modules
COPY --from=build /MY-APP/package*.json ./
COPY --from=build /MY-APP/server.js ./server.js

EXPOSE 3000
CMD ["npm", "run", "start"]
