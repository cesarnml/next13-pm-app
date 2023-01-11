import Greeting from '@components/Greeting'
import GreetingShimmer from '@components/GreetingShimmer'
import { delay } from '@lib/async'
import { getUserFromCookie } from '@lib/auth'
import { prisma } from '@lib/db'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <div className='h-full pr-6 overflow-y-auto w-1/1'>
      <div className=' h-full  items-stretch justify-center min-h-[content]'>
        <div className='flex flex-1 grow'>
          <Suspense fallback={<GreetingShimmer />}>
            {/* FIXME: Fix async Component error  */}
            <Greeting />
          </Suspense>
        </div>
        <div className='flex flex-wrap items-center mt-3 -m-3 flex-2 grow '>
          {/** projects map here */}
          <div className='w-1/3 p-3'>{/* new project here */}</div>
        </div>
        <div className='flex w-full mt-6 flex-2 grow'>
          <div className='w-full'>{/* tasks here */}</div>
        </div>
      </div>
    </div>
  )
}
