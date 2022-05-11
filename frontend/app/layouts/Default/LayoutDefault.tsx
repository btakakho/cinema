import { Navigation } from '@/components/Navigation'
import { Sidebar } from '@/components/Sidebar'

import styles from './LayoutDefault.module.scss'

type Props = {
  children?: React.ReactNode
}

export const LayoutDefault = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.center}>{children}</div>
      <Sidebar />
    </div>
  )
}
