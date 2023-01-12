import { delay } from '@lib/async'
import { getUserFromCookie } from '@lib/auth'
import { prisma } from '@lib/db'
import { Task, TASK_STATUS } from '@prisma/client'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { cookies } from 'next/headers'
import Button from './Button'
import Card from './Card'

const getData = async () => {
  const user = await getUserFromCookie(cookies() as ReadonlyRequestCookies)
  if (user) {
    const tasks = await prisma.task.findMany({
      where: {
        ownerId: user.id,
        NOT: {
          status: TASK_STATUS.COMPLETED,
          deleted: false,
        },
      },
      take: 5,
      orderBy: {
        due: 'asc',
      },
    })

    return tasks
  }
}

type Props = {
  title: string
  tasks?: Task[]
}
const TasksCard = async ({ title, tasks }: Props) => {
  await delay(7000)

  const data = tasks ?? (await getData())

  return (
    <Card>
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-3xl text-gray-600'>{title}</span>
        </div>
        <div>
          <Button intent='text' className='text-violet-600'>
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className='py-2 ' key={task.id}>
                <div>
                  <span className='text-gray-800'>{task.name}</span>
                </div>
                <div>
                  <span className='text-sm text-gray-400'>{task.description}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  )
}

export default TasksCard
