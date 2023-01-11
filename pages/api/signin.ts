import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@lib/db'
import { comparePasswords, createJWT } from '@lib/auth'
import { serialize } from 'cookie'
import { Method, Route } from '@lib/constants'

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === Method.POST) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid login' })
    }

    const isUser = await comparePasswords(req.body.password, user.password)

    if (isUser) {
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
      res.status(200).end()
    } else {
      return res.status(401).json({ error: 'Invalid login' })
    }
  } else {
    res.status(402).end()
  }
}
