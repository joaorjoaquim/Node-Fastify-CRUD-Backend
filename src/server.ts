import Fastify from "fastify";
const mongoose = require("../src/database");

async function main() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get("/users", () => {
    return { user: "teste 1" };
  });

  fastify.post("/users", async () => {
    // const post = await prisma.user.create({
    //   data: {
    //     name: "João",
    //     email: "joaorjoaquim@teste.com",
    //     password: "123456",
    //   },
    // });
    return { post: "ok" };
  });

  await fastify.listen({ port: 3333 });
}

main();
