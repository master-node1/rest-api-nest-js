FROM node:20.10.0-alpine

WORKDIR /OTT-LOBBY-SERVICE
COPY ./*.json ./
# COPY ./ormconfig.js ./

RUN mkdir src

# Copy the rest of your application's codecd ..
COPY ./src /OTT-LOBBY-SERVICE/src

# Install dependencies
RUN npm install -g @nestjs/cli@10.3.2

RUN npm install && nest build

VOLUME ["/OTT-LOBBY-SERVICE/logs"]

CMD ["node", "dist/main", "-- --env=prod"]
