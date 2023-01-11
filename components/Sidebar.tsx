import logo from '@assets/images/logo.svg'
import { links } from '@lib/constants'
import Image from 'next/image'
import Card from './Card'
import SidebarLink from './SidebarLink'

const Sidebar = () => {
  return (
    <Card className='flex flex-wrap items-center justify-between w-40 h-full'>
      <div className='flex items-center justify-center w-full'>
        <Image src={logo} alt='Able logo' priority className='w-14' />
      </div>
      {links.map((link) => (
        <SidebarLink key={link.href} link={link} />
      ))}
    </Card>
  )
}

export default Sidebar
