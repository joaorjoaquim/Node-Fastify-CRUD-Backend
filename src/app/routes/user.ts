import fastifyJwt from "@fastify/jwt";
import fastify, { FastifyInstance } from "fastify";
import { z } from "zod";
import User from "../models/user";
const jwt = require("@fastify/jwt");
const bcrypt = require("bcryptjs");

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 86400,
  });
}

export async function userRoutes(fastify: FastifyInstance) {
  const userCollection = fastify.mongo.db?.collection("users");

  fastify.get("/users", async () => {
    const result = await userCollection.find().toArray();
    return { result };
  });

  fastify.post("/login", async (request, reply) => {
    const createUserBody = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = createUserBody.parse(request.body);
    const hash = await bcrypt.hash(password, 10);
    const user = await userCollection.findOne({ email });
    let test1 = false;
    let test2 = false;

    if (!(await bcrypt.compare(password, user.password))) {
      test1 = true;
    } else {
      test1 = false;
    }
    if (!(await bcrypt.compare(hash, user.password))) {
      test2 = true;
    } else {
      test2 = false;
    }

    const crypted = fastify.jwt.sign(
      {
        email: email,
      },
      {
        sub: email,
        expiresIn: "7 days",
      }
    );
    // const testedCrypted = generateToken({ id: email });
    // console.log(process.env.SECRET);
    reply.send({
      email,
      password,
      hash,
      token: crypted,
      user,
      test1,
      test2,
    });
  });

  fastify.post("/register", async (request, reply) => {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const aux = createUserBody.parse(request.body);
    const hash = await bcrypt.hash(aux.password, 10);
    aux.password = hash;
    const user = new User(aux);

    const response = await userCollection.insertOne(user);
    //fastify.mongo.db.addUser;

    return reply.send({ response, aux, user });
  });
}
