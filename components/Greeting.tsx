import { getUserFromCookie } from '@lib/auth'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { cookies } from 'next/headers'
import Card from './Card'
import CreateProject from './CreateProject'
import GoHome from './GoHome'

const getData = async () => {
  const user = await getUserFromCookie(cookies() as ReadonlyRequestCookies)
  return user
}

const Greetings = async () => {
  const user = await getData()

  if (!user) return <div>{null}</div>

  return (
    <Card className='relative w-full py-4'>
      <div className='mb-4'>
        <h1 className='mb-4 text-3xl font-bold text-gray-700'>Hello, {user.firstName}!</h1>
        <h4 className='text-xl text-gray-400'>Check your daily tasks and schedule</h4>
      </div>
      <div className='flex justify-between'>
        <GoHome />
        <CreateProject />
      </div>
    </Card>
  )
}

export default Greetings
