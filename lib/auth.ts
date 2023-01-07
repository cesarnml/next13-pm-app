import bcrypt from 'bcrypt'

const saltRounds = Number(process.env.SALT_ROUNDS)

export async function hashPassword(secret: string) {
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(secret, salt)
}

// ref: https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
