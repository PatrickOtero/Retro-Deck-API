import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma/prisma';

export const getEmulator = {
  async execute(req: FastifyRequest, res: FastifyReply) {

    const { emulatorName } = req.params as {emulatorName: string}

    try {
      const emulator = await prisma.emulator.findFirst({
        where: {emulatorName}
      });

      return res.status(200).send(emulator);
    } catch (error: any) {
      console.error('Erro ao buscar o emulador no banco de dados:', error.response?.data || error.message);

      return res.status(500).send({
        error: 'Internal server error',
        details: error.response?.data || error.message,
      });
    }
  },
};
