import { FastifyInstance } from "fastify";

export async function projectRoutes(fastify: FastifyInstance) {
  const collection = fastify.mongo.db?.collection("projects");

  fastify.get("/projects", async () => {
    const result = await collection.find().toArray();
    return { result };
  });
}
