import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@lib/db'
import { createJWT, hashPassword } from '@lib/auth'
import { serialize } from 'cookie'
import { HttpMethod, Route } from '@lib/constants'

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HttpMethod.POST) {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    })

    const jwt = await createJWT(user)

    const maxAge = 60 * 60 * 24 * 7 /// 1 week
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIE_NAME, jwt, {
        httpOnly: true,
        path: Route.Root,
        maxAge,
      }),
    )
    res.status(201).end()
  } else {
    res.status(402).end()
  }
}
