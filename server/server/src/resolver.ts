import { Resolver, Query } from "type-graphql";

@Resolver()
export class PingResolver {
  @Query(() => String)
  async ping() {
    return "pong!";
  }
}
