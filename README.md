# Federation Example
Really basic example to build a single federated service, a gateway and to demonstrate caching

To run either:

Use docker-compose:

docker-compose build && docker-compose up

Use native:

Start a redis container (docker run -p 6379:6379 redis), make sure you have a recent enough node to recognize the type in package.json (I'm using 15.4), npm install and then start the server.js for person service and then the gateway

Once it is running, you can jump onto the container (docker exec -it CONTAINER_ID sh), and execute redis-cli MONITOR to watch what is happening.

If the person server is set to cache, I see gets and sets, Cache-Control headers and retrievals from cache.  If the gateway is set to cache, I see gets but no sets and no retrievals from cache
