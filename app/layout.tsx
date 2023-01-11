import GlassPane from '@components/GlassPane'
import { Inter } from '@next/font/google'
import '@styles/globals.css'

const inter = Inter({
  variable: '--font-inter',
})

type Props = {
  children: React.ReactNode
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang='en' className={inter.variable}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='h-screen w-screen rainbow-mesh p-6'>
        <GlassPane className='w-full h-full flex items=center justify-center'>{children}</GlassPane>
      </body>
    </html>
  )
}
