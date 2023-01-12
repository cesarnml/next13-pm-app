import Greeting from '@components/Greeting'
import GreetingShimmer from '@components/GreetingShimmer'
import ProjectCard, { ProjectWithTasks } from '@components/ProjectCard'
import { delay } from '@lib/async'
import { getUserFromCookie } from '@lib/auth'
import { prisma } from '@lib/db'
import { Project } from '@prisma/client'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'

const getData = async () => {
  await delay(2000)
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
    <div className='h-full pr-6 w-1/1'>
      <div className=' h-full  items-stretch justify-center min-h-[content]'>
        <div className='flex flex-1 grow'>
          <Suspense fallback={<GreetingShimmer />}>
            {/* @ts-expect-error Server Component*/}
            <Greeting />
          </Suspense>
        </div>
        <div className='flex flex-wrap items-center mt-3 -m-3 flex-2 grow '>
          {projects.map((project) => (
            <div className='w-1/3 p-3' key={project.id}>
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}{' '}
          <div className='w-1/3 p-3'>{/* new project here */}</div>
        </div>
        <div className='flex w-full mt-6 flex-2 grow'>
          <div className='w-full'>{/* tasks here */}</div>
        </div>
      </div>
    </div>
  )
}
