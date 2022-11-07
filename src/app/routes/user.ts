import { FastifyInstance } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  const collection = fastify.mongo.db?.collection("users");

  fastify.get("/users", async () => {
    const result = await collection.find().toArray();
    return { result };
  });
}
