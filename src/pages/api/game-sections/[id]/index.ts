import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { gameSectionValidationSchema } from 'validationSchema/game-sections';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.game_section
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getGameSectionById();
    case 'PUT':
      return updateGameSectionById();
    case 'DELETE':
      return deleteGameSectionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGameSectionById() {
    const data = await prisma.game_section.findFirst(convertQueryToPrismaUtil(req.query, 'game_section'));
    return res.status(200).json(data);
  }

  async function updateGameSectionById() {
    await gameSectionValidationSchema.validate(req.body);
    const data = await prisma.game_section.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteGameSectionById() {
    const data = await prisma.game_section.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
