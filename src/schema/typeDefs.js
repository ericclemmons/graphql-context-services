import gql from "graphql-tag"

export default gql`
  """
  Simple GitHub API schema
  """
  type GitHub {
    rateLimit: RateLimit!
  }

  """
  Structure of https://api.github.com/rate_limit
  """
  type RateLimit {
    limit: Int!
    remaining: Int!
    reset: Int!
  }

  type Query {
    """
    req.ip
    """
    ip: String!

    """
    Access https://api.github.com/
    """
    github: GitHub!

    """
    Current version of the app
    """
    version: String!
  }
`
