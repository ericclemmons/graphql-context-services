import * as services from "./services"

export default class Context {
  constructor({ cache, req }) {
    this.req = req
    this.services = {}

    // ! This is explicitly doing what Apollo Server does for `dataSources`
    // ! internally, as documented here:
    // > https://github.com/apollographql/apollo-server/blob/master/docs/source/features/data-sources.md#accessing-data-sources-from-resolvers
    for (const [name, Service] of Object.entries(services)) {
      const service = new Service()

      if (service.initialize) {
        service.initialize({
          cache,
          // ! This allows services to reference each other 💪
          context: this,
        })
      }

      this.services[name] = service
    }
  }

  // ! Resolvers should reference explicit properties on `context`
  // ! instead of relying on `req` directly.
  get ip() {
    return this.req.ip
  }
}
