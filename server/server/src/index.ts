import "reflect-metadata";
import { createContext } from "./context";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

async function main() {
    const port = process.env.PORT || 4000;
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.[tj]s"],
        emitSchemaFile: __dirname + "/schema.gql",
    });
    const server = new ApolloServer({
        schema: schema,
        context: createContext,
        introspection: true,
    });
    const { url } = await server.listen(port);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

main();
