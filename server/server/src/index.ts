import "reflect-metadata";
import { createContext } from "./context";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

async function main() {
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.ts"],
    });
    const server = new ApolloServer({
        schema: schema,
        context: createContext,
    });
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

main();
