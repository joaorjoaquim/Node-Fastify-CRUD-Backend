import Fastify from "fastify";
import dbConnector from "./database";
const mongoose = require("../src/database");

async function main() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(dbConnector);

  fastify.get("/users", () => {
    return { user: "teste 1" };
  });

  fastify.post("/users", async () => {
    return { post: "ok" };
  });

  await fastify.listen({ port: 3333 });
}

main();
