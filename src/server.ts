import Fastify from "fastify";
import { userRoutes } from "./app/routes/user";
import dbConnector from "./database";
const mongoose = require("../src/database");

async function main() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(dbConnector);

  await fastify.register(userRoutes);

  fastify.post("/users", async () => {
    return { post: "ok" };
  });

  await fastify.listen({ port: 3333 });
}

main();
