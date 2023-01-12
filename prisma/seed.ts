import { hashPassword } from '@lib/auth'
import { prisma } from '@lib/db'
import { TASK_STATUS } from '@prisma/client'
import { faker } from '@faker-js/faker/locale/en_US'

const minProjects = 0
const maxProjects = 50
const minTasks = 0
const maxTasks = 50

const getRandomTaskStatus = () => {
  return faker.helpers.arrayElement([TASK_STATUS.COMPLETED, TASK_STATUS.NOT_STARTED, TASK_STATUS.STARTED])
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
        create: new Array(faker.datatype.number({ min: minProjects, max: maxProjects })).fill(null).map((_) => ({
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
        data: new Array(faker.datatype.number({ min: minTasks, max: maxTasks })).fill(null).map((_, i) => {
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
