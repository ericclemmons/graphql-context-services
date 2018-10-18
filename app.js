import express from "express"
import graphql from "express-graphql"

import schema from "./schema"

export default express()
  .get("/", (req, res) => res.redirect("/graphql"))
  .use(
    "/graphql",
    graphql((req, res) => {
      return {
        graphiql: true,
        pretty: true,
        schema,
      }
    })
  )
