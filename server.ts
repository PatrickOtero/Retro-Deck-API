import Fastify from 'fastify';
import dotenv from 'dotenv';
import { gameRoutes } from './gameRoutes';
import cors from "@fastify/cors"

dotenv.config();

const fastify = Fastify();

fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(gameRoutes);

fastify.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
