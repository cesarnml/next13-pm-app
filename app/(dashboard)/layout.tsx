import Sidebar from '@components/Sidebar'

type Props = {
  children: React.ReactNode
}

const DashboardRootLayout = ({ children }: Props) => {
  return (
    <>
      <main className='w-full h-full pl-6 flex gap-8'>
        <Sidebar />
        {children}
      </main>
    </>
  )
}
export default DashboardRootLayout
