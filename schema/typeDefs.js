import gql from "graphql-tag"

export default gql`
  type GitHub {
    rateLimit: RateLimit!
  }

  type RateLimit {
    limit: Int!
    remaining: Int!
    reset: Int!
  }

  type Query {
    ip: String!
    github: GitHub!
    version: String!
  }
`
