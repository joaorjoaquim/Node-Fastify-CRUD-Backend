import fastifyJwt from "@fastify/jwt";
import fastify, { FastifyInstance } from "fastify";
import { z } from "zod";
const jwt = require("@fastify/jwt");

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 86400,
  });
}

export async function userRoutes(fastify: FastifyInstance) {
  const collection = fastify.mongo.db?.collection("users");

  fastify.get("/users", async () => {
    const result = await collection.find().toArray();
    return { result };
  });

  fastify.post("/login", async (request, reply) => {
    const createUserBody = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = createUserBody.parse(request.body);
    const crypted = await reply.jwtSign({ id: email }, { expiresIn: 86400 });
    console.log(crypted);
    reply.send({
      email,
      password,
      token: crypted,
    });
  });
}
