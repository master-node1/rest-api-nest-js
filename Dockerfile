FROM node:20.10.0-alpine

WORKDIR /rest-api-nest
COPY ./*.json ./
# COPY ./ormconfig.js ./

RUN mkdir src

# Copy the rest of your application's codecd ..
COPY ./src /rest-api-nest/src

# Install dependencies
RUN npm install -g @nestjs/cli@10.3.2

RUN npm install && nest build

VOLUME ["/rest-api-nest/logs"]

CMD ["node", "dist/main", "-- --env=prod"]
