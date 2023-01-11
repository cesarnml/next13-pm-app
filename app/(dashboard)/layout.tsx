type Props = {
  children: React.ReactNode
}

const DashboardRootLayout = ({ children }: Props) => {
  return (
    <>
      <main className='w-full pl-6 h-full'>{children}</main>
    </>
  )
}
export default DashboardRootLayout
