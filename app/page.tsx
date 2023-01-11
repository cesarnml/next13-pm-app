import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Main() {
  return <main className={styles.main}>Main page</main>
}
