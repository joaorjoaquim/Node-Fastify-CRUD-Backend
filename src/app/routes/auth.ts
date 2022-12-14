import { FastifyInstance } from "fastify";
import { z } from "zod";
import dbConnector from "../../database";
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
  const collection = fastify.mongo.db?.collection("users");
  fastify.get(
    "/me",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      return { user: request.user };
    }
  );

  fastify.post("/access", async (request) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(request.body);

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    let user = await collection.findOne({
      where: {
        googleId: userInfo.id,
      },
    });

    // if (!user) {
    //   user = await collection.insertOnecreate({
    //     data: {
    //       googleId: userInfo.id,
    //       name: userInfo.name,
    //       email: userInfo.email,
    //       avatarUrl: userInfo.picture,
    //     },
    //   });
    // }

    const token = fastify.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: "7 days",
      }
    );

    return { token };
  });
}
