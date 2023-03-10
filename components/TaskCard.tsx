import { getUserFromCookie } from '@lib/auth'
import { prisma } from '@lib/db'
import { Task, TASK_STATUS } from '@prisma/client'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { cookies } from 'next/headers'
import Card from './Card'
import CreateTask from './CreateTask'

const NUMBER_OF_RECENT_TASKS = 5

const getData = async () => {
  const user = await getUserFromCookie(cookies() as ReadonlyRequestCookies)
  if (user) {
    const tasks = await prisma.task.findMany({
      where: {
        ownerId: user.id,
        NOT: {
          status: TASK_STATUS.COMPLETED,
          deleted: true,
        },
      },
      take: NUMBER_OF_RECENT_TASKS,
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
  const data = tasks ?? (await getData())

  if (!data?.length) {
    return <div>No tasks yet</div>
  }

  return (
    <Card>
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-3xl text-gray-600'>{title}</span>
        </div>
        <div>
          <CreateTask />
        </div>
      </div>
      <div>
        <div>
          {data?.map((task) => (
            <div className='py-2 ' key={task.id}>
              <div>
                <span className='text-gray-800 font-semibold'>{task.name}</span>
              </div>
              <div>
                <span className='text-sm text-gray-400'>{task.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default TasksCard
