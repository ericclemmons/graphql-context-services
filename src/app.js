import express from "express"
import graphql from "express-graphql"

import Context from "./Context"
import schema from "./schema"

export default express()
  .set("trust proxy", true)
  .get("/", (req, res) => res.redirect("/graphql"))
  .use(
    "/graphql",
    graphql((req, res) => {
      // ! Feel free to use a cache as documented here:
      // > https://github.com/apollographql/apollo-server/blob/master/docs/source/features/data-sources.md#using-memcachedredis-as-a-cache-storage-backend
      //
      // const { RedisCache } = require('apollo-server-cache-redis');
      // const cache = new RedisCache({
      //   host: 'redis-server',
      //   // Options are passed through to the Redis client
      // }),
      const cache = undefined
      const context = new Context({ cache, req })

      return {
        context,
        graphiql: true,
        pretty: true,
        schema,
      }
    })
  )
