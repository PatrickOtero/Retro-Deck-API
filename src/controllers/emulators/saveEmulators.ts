import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma/prisma';

export const saveEmulator = {
  async execute(req: FastifyRequest, res: FastifyReply) {
    const { emulatorName } = req.body as {emulatorName: string}

    if (!emulatorName) {
      return res.status(400).send({ message: "Emulator name is required"})
    }

    const emulatorExists = await prisma.emulator.findFirst(
      { where: {emulatorName}}
    )

    if (emulatorExists) {
      return res.status(400).send({ message: "Emulator already registered"})
    }

    try {
      await prisma.emulator.create({
        data: {
          emulatorName
        }
      });

      return res.status(201).send({ message: "Emulator created successfully"});
    } catch (error: any) {
      console.error('Erro ao salvar o emulador no banco de dados:', error.response?.data || error.message);

      return res.status(500).send({
        error: 'Internal server error',
        details: error.response?.data || error.message,
      });
    }
  },
};
