import CreateProject from '@components/CreateProject'
import Greeting from '@components/Greeting'
import GreetingShimmer from '@components/GreetingShimmer'
import ProjectCard from '@components/ProjectCard'
import TaskCard from '@components/TaskCard'
import { getUserFromCookie } from '@lib/auth'
import { Route } from '@lib/constants'
import { prisma } from '@lib/db'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'

const getData = async () => {
  const user = await getUserFromCookie(cookies() as ReadonlyRequestCookies)
  if (user) {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: user.id,
      },
      include: {
        tasks: true,
      },
    })

    return projects
  }
}

export default async function Page() {
  const projects = await getData()

  if (!projects) return <div>{null}</div>

  return (
    <div className='w-full h-full pl-6 pr-6 overflow-y-auto'>
      <div className=' h-full items-stretch justify-center min-h-[content]'>
        <div className='flex flex-1 grow'>
          <Suspense fallback={<GreetingShimmer />}>
            {/* @ts-expect-error Server Component*/}
            <Greeting />
          </Suspense>
        </div>
        <div className='flex flex-wrap items-center mt-3 -m-3 flex-2 grow '>
          {projects.map((project) => (
            <div className='w-1/3 p-3' key={project.id}>
              <Link href={Route.Project(project.id)}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <div className='w-1/3 p-3'>{/* new project here */}</div>
        </div>
        <div className='flex w-full my-6 flex-2 grow'>
          <div className='w-full'>
            <Suspense fallback={<div>Loading...</div>}>
              {/* @ts-expect-error Server Component*/}
              <TaskCard title='Tasks' />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
