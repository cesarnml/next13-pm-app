'use client'

import { Route } from '@lib/constants'
import { useRouter } from 'next/navigation'
import Button from './Button'

const GoHome = () => {
  const router = useRouter()
  return <Button onClick={() => router.push(Route.Home)}>Today&apos;s Schedule</Button>
}

export default GoHome
