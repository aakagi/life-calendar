import { LifeCalendar } from '@/components/life-calendar'

import styles from './MainScreen.module.css'

export default function MainScreen() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <LifeCalendar />
      </main>
    </div>
  )
}
