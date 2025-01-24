import { FastifyInstance } from 'fastify';
import { searchGamesFromRawg } from './src/controllers/games/searchGamesFromRawg';
import { getSavedGamesFromLocalDb } from './src/controllers/games/getSavedGamesFromLocalDb';
import { normalizeGameDescriptionInLocalDatabase } from './src/controllers/games/normalizeGameDescriptionInLocalDatabase';

export const gameRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/games/:id', searchGamesFromRawg.searchGame);
  fastify.get("/searchGamesLocalDb/:id", getSavedGamesFromLocalDb.searchGame )
  fastify.patch("/normalizeGameDescription/all", normalizeGameDescriptionInLocalDatabase.execute )
};
