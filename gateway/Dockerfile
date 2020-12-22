FROM node:15.4-alpine

WORKDIR /code

COPY . /code
RUN npm install && \
 cp services-docker.json services.json && \
 apk add python3

CMD ["node", "server.js"]
