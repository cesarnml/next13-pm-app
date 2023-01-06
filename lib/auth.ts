import bcrypt from 'bcrypt'

const saltRounds = 10

const plainTextPassword1 = 'DFGh5546*%^__90'

async function main() {
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(plainTextPassword1, salt)
    console.log('salt:', salt)
  } catch (error) {
    if (error instanceof Error) {
      return console.error(error.message)
    }
    //? log generic error
    return console.error(error)
  }
}

main()

// ref: https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
