import { createContext } from "./context";
import { createServer } from "@graphql-yoga/node";

async function main() {
  const server = createServer({ context: createContext });
  await server.start();
}

main();
