'use client'
import { LinkType } from '@lib/typings'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, Grid, Settings, User } from 'react-feather'

const iconMap = { Settings, User, Grid, Calendar }

type Props = {
  link: LinkType
}

const SidebarLink = ({ link }: Props) => {
  const pathname = usePathname()

  const isActive = pathname === link.href

  const Icon = iconMap[link.icon as keyof typeof iconMap]

  return (
    <Link href={link.href} className='flex items-center justify-center w-full'>
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
