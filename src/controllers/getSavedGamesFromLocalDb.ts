import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../prisma/prisma';

export const getSavedGamesFromLocalDb= {
  async searchGame(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };

    function corrigirNome(nome: string): string {
      nome = nome.replace(/\s*\([^)]*\)/g, '');
      return nome
  }
  
  const gameName = corrigirNome(id)

  console.log(gameName)

    if (!gameName) {
      return res.status(400).send({ error: 'A name for the game is needed' });
    }

    try {

      const game = await prisma.game.findFirst({
        where: { name: gameName }
      });

      return res.status(201).send({ game, localDB: true });
    } catch (error: any) {
      console.error('Erro ao buscar o jogo no banco de dados:', error.response?.data || error.message);

      return res.status(500).send({
        error: 'Internal server error',
        details: error.response?.data || error.message,
      });
    }
  },
};
