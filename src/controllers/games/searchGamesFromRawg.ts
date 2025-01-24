import { FastifyReply, FastifyRequest } from 'fastify';
import axios from 'axios';
import { prisma } from '../../../prisma/prisma';
import { nameNormalizer } from '../../utils/nameNormalizer';
import { removeHtmlTags } from '../../utils/descriptionNormalizer';

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

    const RAWG_API_KEY = process.env.RAWG_API_KEY;

    if (!RAWG_API_KEY) {
      return res.status(500).send({ error: 'RAWG_API_KEY is not configured' });
    }

    if (!gameSlug) {
      return res.status(400).send({ error: 'An id or a slug for the game is needed' });
    }

    const gameName = nameNormalizer(id)

    const gameExists = await prisma.game.findFirst({
      where: {
        gameName
      }
    });

    if (gameExists) {
      return res.status(400).send({message: "This game info was already saved on database"})
    }

    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${gameSlug}`, {
        params: {
          key: RAWG_API_KEY,
          id,
        },
      });

      const gameData = response.data;

      if (!gameData || !gameData.name || !gameData.description || !gameData.background_image) {
        const gameName = nameNormalizer(gameData.name)
      
        await prisma.game.create({
          data: {
            gameName: gameName,
            description: removeHtmlTags(gameData?.description) || "no info from rawg",
            backgroundImage: gameData?.background_image || "no info from rawg"
          },
        });

        return res.status(404).send({ message: 'Game data incomplete from RAWG' });
      }

      const gameName = nameNormalizer(gameData.name)
      
      const game = await prisma.game.create({
        data: {
          gameName: gameName,
          description: removeHtmlTags(gameData.description),
          backgroundImage: gameData.background_image
        },
      });

      return res.status(200).send({game, localDb: false});
    } catch (error: any) {
      const gameName = nameNormalizer(id)

      await prisma.game.create({
        data: {
          gameName: gameName,
          description: "no info from rawg",
          backgroundImage: "no info from rawg"
        },
      });

      return res.status(500).send({
        error: 'Internal server error',
        details: error.response?.data || error.message,
      });
    }
  },
};
