'use client'
import { LinkType } from '@lib/typings'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, Grid, Settings, User } from 'react-feather'

const icons = { Settings, User, Grid, Calendar }

type Props = {
  link: LinkType
}

const SidebarLink = ({ link }: Props) => {
  const pathname = usePathname()
  let isActive = false

  if (pathname === link.link) {
    isActive = true
  }

  const Icon = icons[link.icon as keyof typeof icons]
  return (
    <Link href={link.link} className='flex items-center justify-center w-full'>
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out',
          isActive && 'stroke-violet-600',
        )}
      />
    </Link>
  )
}

export default SidebarLink
