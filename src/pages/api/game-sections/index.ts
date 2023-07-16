import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { gameSectionValidationSchema } from 'validationSchema/game-sections';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGameSections();
    case 'POST':
      return createGameSection();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGameSections() {
    const data = await prisma.game_section
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'game_section'));
    return res.status(200).json(data);
  }

  async function createGameSection() {
    await gameSectionValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.file?.length > 0) {
      const create_file = body.file;
      body.file = {
        create: create_file,
      };
    } else {
      delete body.file;
    }
    const data = await prisma.game_section.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}