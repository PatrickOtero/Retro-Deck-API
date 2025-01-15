import { FastifyInstance } from 'fastify';
import { searchGamesFromRawg } from './src/controllers/games/searchGamesFromRawg';
import { getSavedGamesFromLocalDb } from './src/controllers/games/getSavedGamesFromLocalDb';
import { normalizeGameDescriptionInLocalDatabase } from './src/controllers/games/normalizeGameDescriptionInLocalDatabase';
import { saveEmulator } from './src/controllers/emulators/saveEmulators';
import { getEmulator } from './src/controllers/emulators/getEmulators';

export const gameRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/games/:id', searchGamesFromRawg.searchGame);
  fastify.get("/searchGamesLocalDb/:id", getSavedGamesFromLocalDb.searchGame )
  fastify.patch("/normalizeGameDescription/all", normalizeGameDescriptionInLocalDatabase.execute )

  fastify.post("/saveEmulator", saveEmulator.execute)
  fastify.get("/getEmulator/:emulatorName", getEmulator.execute)
};
