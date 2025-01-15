import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../prisma/prisma";
import { removeHtmlTags } from "../../utils/descriptionNormalizer"

export const normalizeGameDescriptionInLocalDatabase = {

    async execute(req: FastifyRequest, res: FastifyReply ) {
        try {   
            const games = await prisma.game.findMany()

            for ( let game of games ) {

                await prisma.game.update({
                    where: {id: game.id},
                    
                    data: {description: removeHtmlTags(game.description)}
                })
            }

            return res.status(201).send({ message: "The descriptions were all normalized"})
               
            } catch (error: any) {
            return res.status(400).send({ message: "Something went wrong"})
            }
    }
        
}