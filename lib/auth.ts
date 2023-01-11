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

export const createJWT = ({ id, email }: User) => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const alg = 'HS256'
  const typ = 'JWT'
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 * 7
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const payload = { id, email }
  return new SignJWT(payload)
    .setProtectedHeader({ alg, typ })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(secret)
}
// Validate a JWT:
export const validateJWT = async (jwt: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const { payload } = await jwtVerify(jwt, secret)

  return payload as { id: string; email: string }
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
