import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { SignJWT, jwtVerify } from 'jose'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { prisma } from './db'

const saltRounds = Number(process.env.SALT_ROUNDS)

export async function hashPassword(secret: string) {
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(secret, salt)
}

export async function comparePasswords(plainTextPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

// ref: https://auth0.com/blog/hashing-in-action-understanding-bcrypt/

export const createJWT = (user: User) => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 * 7

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}
// Validate a JWT:
export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET))

  return payload.payload as any
}

// Getting the JWT from cookies:
export const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME)

  const { id } = await validateJWT(jwt?.value ?? '')

  const user = await prisma.user.findUnique({
    where: {
      id: id as string,
    },
  })

  return user
}
