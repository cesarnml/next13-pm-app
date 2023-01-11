import GlassPane from '@components/GlassPane'
import { Inter } from '@next/font/google'
import '@styles/globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
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
      <body className='w-screen h-screen p-6 rainbow-mesh'>
        <GlassPane className='flex items-center justify-center w-full h-full'>{children}</GlassPane>
      </body>
    </html>
  )
}
