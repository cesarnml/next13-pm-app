import { NextApiRequest, NextApiResponse } from 'next'
import { validateJWT } from '@lib/auth'
import { prisma } from '@lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.cookies[process.env.COOKIE_NAME]
  if (jwt) {
    const user = await validateJWT(jwt)
    await prisma.project.create({
      data: {
        name: req.body.name,
        ownerId: user.id,
      },
    })
    return res.status(200).json({ data: { message: 'ok' } })
  }
  res.status(401).end('Not authorized')
}
