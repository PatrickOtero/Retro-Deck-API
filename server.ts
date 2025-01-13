import Fastify from 'fastify';
import dotenv from 'dotenv';
import { gameRoutes } from './gameRoutes';

dotenv.config();

const fastify = Fastify();

fastify.register(gameRoutes);

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
