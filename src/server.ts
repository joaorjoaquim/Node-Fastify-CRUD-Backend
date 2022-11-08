import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";
import { projectRoutes } from "./app/routes/project";
import { taskRoutes } from "./app/routes/task";
import { userRoutes } from "./app/routes/user";

import dbConnector from "./database";

async function main() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: process.env.SECRET,
  });

  fastify.register(dbConnector);

  await fastify.register(userRoutes);
  await fastify.register(taskRoutes);
  await fastify.register(projectRoutes);

  await fastify.listen({ port: 3333 });
}

main();
