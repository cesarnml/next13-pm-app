import bcrypt from 'bcrypt'

const saltRounds = 10

const plainTextPassword1 = 'DFGh5546*%^__90'

export async function hashPassword() {
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(plainTextPassword1, salt)
}

// ref: https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
