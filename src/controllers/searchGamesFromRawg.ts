import { FastifyReply, FastifyRequest } from 'fastify';
import axios from 'axios';
import { prisma } from '../../prisma/prisma';

export const searchGamesFromRawg = {
  async searchGame(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };

    function gerarSlug(nome: string): string {
      nome = nome.replace(/\s*\([^)]*\)/g, '');
  
      return nome
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
  }
  
  const gameSlug = gerarSlug(id)

  console.log(gameSlug)

    const RAWG_API_KEY = process.env.RAWG_API_KEY;

    if (!RAWG_API_KEY) {
      return res.status(500).send({ error: 'RAWG_API_KEY is not configured' });
    }

    if (!gameSlug) {
      return res.status(400).send({ error: 'An id or a slug for the game is needed' });
    }

    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${gameSlug}`, {
        params: {
          key: RAWG_API_KEY,
          id,
        },
      });

      const gameData = response.data;

      if (!gameData) {
        return res.status(404).send({ message: 'Game not found' });
      }
      
      const game = await prisma.game.create({
        data: {
          name: gameData.name,
          description: gameData.description,
          background_image: gameData.background_image
        },
      });

      return res.status(201).send({game, localDb: false});
    } catch (error: any) {
      console.error('Erro ao buscar ou salvar o jogo:', error.response?.data || error.message);

      return res.status(500).send({
        error: 'Internal server error',
        details: error.response?.data || error.message,
      });
    }
  },
};
