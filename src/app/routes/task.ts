import { FastifyInstance } from "fastify";

export async function taskRoutes(fastify: FastifyInstance) {
  const collection = fastify.mongo.db?.collection("tasks");

  fastify.get("/tasks", async () => {
    const result = await collection.find().toArray();
    return { result };
  });
}
