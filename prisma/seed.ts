import { hashPassword } from '@lib/auth'
import { prisma } from '@lib/db'
import { TASK_STATUS } from '@prisma/client'
import { faker } from '@faker-js/faker/locale/en_US'

const getRandomTaskStatus = () => {
  const statuses = [TASK_STATUS.COMPLETED, TASK_STATUS.NOT_STARTED, TASK_STATUS.STARTED]
  return statuses[Math.floor(Math.random() * statuses.length)]
}

async function main() {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = faker.helpers.unique(faker.internet.email, [firstName, lastName])

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: await hashPassword(process.env.HASH_SECRET),
      projects: {
        create: new Array(Math.floor(Math.random() * 10)).fill(null).map((_, i) => ({
          name: faker.vehicle.model(),
          due: faker.datatype.datetime(),
        })),
      },
    },
    include: {
      projects: true,
    },
  })

  const tasks = await Promise.all(
    user.projects.map((project) =>
      prisma.task.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: faker.hacker.phrase(),
            ownerId: user.id,
            projectId: project.id,
            description: faker.finance.transactionDescription(),
            status: getRandomTaskStatus(),
          }
        }),
      }),
    ),
  )

  console.log({ user, tasks })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
