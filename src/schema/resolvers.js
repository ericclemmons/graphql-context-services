const { version } = require("../../package.json")

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export default {
  GitHub: {
    rateLimit(parent, args, context, info) {
      const { GitHub } = context.services

      return GitHub.getRateLimit()
    },
  },

  Query: {
    ip(parent, args, context, info) {
      return context.ip
    },

    github() {
      return {}
    },

    version() {
      return version
    },
  },
}
