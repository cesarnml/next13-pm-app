import TaskCard from '@components/TaskCard'
import { getUserFromCookie } from '@lib/auth'
import { prisma } from '@lib/db'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { cookies } from 'next/headers'

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies() as ReadonlyRequestCookies)
  if (user) {
    const project = await prisma.project.findFirst({
      where: { id, ownerId: user.id },
      include: {
        tasks: true,
      },
    })

    return project
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getData(params.id)

  if (!project) return <div>{null}</div>

  return (
    <div className='h-full pr-6 overflow-y-auto w-1/1'>
      {/* @ts-expect-error Server Component */}
      <TaskCard tasks={project.tasks} title={project.name} />
    </div>
  )
}
