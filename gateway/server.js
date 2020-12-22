import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from "@apollo/gateway";
import { RedisCache } from 'apollo-server-cache-redis'
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import Configurator from './modules/Configurator.js'

let config = new Configurator('services.json');

let serviceList = config.service_list;

console.log(JSON.stringify(serviceList, null, 2))

let gateway = new ApolloGateway({
    serviceList
})

let redis_cache_host = process.env.REDIS_HOST || "localhost"
console.log("Configuring redis host: " + redis_cache_host)
const server = new ApolloServer({
    gateway,
    cache: new RedisCache({
        host: redis_cache_host
    }),
    cacheControl: {
        defaultMaxAge: 50,
    },
    plugins: [responseCachePlugin()],
    // Disable subscriptions (not currently supported with ApolloGateway)
    subscriptions: false,
    introspection: true
});

let { url } = await server.listen({ port: 8080 });

console.log("Listening: " + url)
