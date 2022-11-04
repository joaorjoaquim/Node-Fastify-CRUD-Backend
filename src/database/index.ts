// ESM
import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import { FastifyInstance } from "fastify";
import "dotenv/config";

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify: FastifyInstance, options: Object) {
  fastify.register(fastifyMongo, {
    url: process.env.DATABASE_URL,
  });
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector);
