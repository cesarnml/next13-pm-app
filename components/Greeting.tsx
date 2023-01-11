import { delay } from '@lib/async'
import { getUserFromCookie } from '@lib/auth'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { cookies } from 'next/headers'
import Button from './Button'
import Card from './Card'

const getData = async () => {
  await delay(5000)
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
      <div>
        <Button size='large'>Today&apos;s Schedule</Button>
      </div>
    </Card>
  )
}

export default Greetings
