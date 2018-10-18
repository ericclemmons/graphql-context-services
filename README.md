# GraphQL `Context` and Services

> Simple example showing how to use `Context` as a `class` within GraphQL,
> along with `context.services` for abstracting away downstream **API
> complexity.**
>
> For extra credit, this also shows off Apollo's [REST Data Source](https://www.apollographql.com/docs/apollo-server/features/data-sources.html#REST-Data-Source)
> with **built in caching**!

## Demo

[![Example of a GraphQL query](graphql-context-services.png)](https://codesandbox.io/s/github/ericclemmons/graphql-context-services?module=README.md)

Use the following example query:

```graphql
query MyGitHubRateLimit {
  # Example of getting properties from context
  ip

  # Example of using context.services.GitHub
  github {
    rateLimit {
      limit
      # 👇 Cached automatically!
      remaining
    }
  }

  # Returning the app version is handy 🤷‍♂️
  version
}
```

## Rationale

- Using `Context` (instead of a plain `{...}` object) moves
  complexity from within your middleware to a separate, testable layer:

  ```js
  .use(
    "/graphql",
    graphql((req, res) => {
      const context = new Context({ req })

      return {
        context,
        graphiql: true,
        pretty: true,
        schema,
      }
    })
  ```

- `Context` can have a strict, testable API for your resolvers to use,
  instead of ad-hoc reliance on `req.query` or `req.body`:

  ```js
  // Before
  ip: (parent, args, context, info) => {
    if (req.header("x-forwarded-for")) {
      return req
        .header("x-forwarded-for")
        .split(",")
        .shift()
    }

    if (req.connection.remoteAddress) {
      return req.connection.remoteAddress
    }

    return req.ip
  }

  // After
  ip: (parent, args, context, inf0) => {
    return context.ip
  }
  ```

- API calls within resolvers are simplified:

  ```js
  rateLimit: (parent, args, context, info) => {
    const { GitHub } = context.services

    return GitHub.getRateLimit()
  }
  ```

- The same as Apollo's `dataSources`, but works with the standard `express-graphql` library:

  > <https://www.apollographql.com/docs/apollo-server/features/data-sources.html#Accessing-data-sources-from-resolvers>

## Author

Eric Clemmons ([@ericclemmons](https://twitter.com/ericclemmons))
