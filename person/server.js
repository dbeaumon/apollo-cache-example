import { ApolloServer } from 'apollo-server';
import { resolvers }  from './modules/resolvers/resolvers.js'
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { RedisCache } from 'apollo-server-cache-redis'
import { buildFederatedSchema } from '@apollo/federation';
import { typeDefs} from "./modules/schema/schema.js";

const schema = buildFederatedSchema([{ typeDefs, resolvers }])

let redis_cache_host = process.env.REDIS_HOST || "localhost"

const server = new ApolloServer({
    schema,
    /*
    Re-enable to see local service caching working
    cache: new RedisCache({
        host: redis_cache_host
    }),
    cacheControl: {
        defaultMaxAge: 50,
    },
    plugins: [responseCachePlugin()]
     */
});

// The `listen` method launches a web server.  The top-level await only works on really recent node
let { url } = await server.listen({ port: 5001 });

console.log("Listening: " + url)
