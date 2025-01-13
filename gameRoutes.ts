import { FastifyInstance } from 'fastify';
import { searchGamesFromRawg } from './src/controllers/searchGamesFromRawg';
import { getSavedGamesFromLocalDb } from './src/controllers/getSavedGamesFromLocalDb';

export const gameRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/games/:id', searchGamesFromRawg.searchGame);
  fastify.get("/games/local/:id", getSavedGamesFromLocalDb.searchGame )
};
