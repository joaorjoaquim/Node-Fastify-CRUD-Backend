import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const fastify = Fastify({
    logger: true,
  });

  fastify.get("/users", () => {
    return { user: "teste 1" };
  });

  fastify.post("/users", async () => {
    const post = await prisma.user.create({
      data: {
        name: "João",
        email: "joaorjoaquim@teste.com",
        password: "123456",
      },
    });
    return { post };
  });

  await fastify.listen({ port: 3333 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
