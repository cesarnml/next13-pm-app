import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUNDS

const hashSecret = process.env.HASH_SECRET

export async function hashPassword() {
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(hashSecret, salt)
}

// ref: https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
