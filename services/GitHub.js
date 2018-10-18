import { RESTDataSource } from "apollo-datasource-rest"

export default class GitHub extends RESTDataSource {
  constructor() {
    super()

    this.baseURL = "https://api.github.com/"
  }

  async getRateLimit() {
    const { rate } = await this.get("rate_limit")

    return rate
  }
}
