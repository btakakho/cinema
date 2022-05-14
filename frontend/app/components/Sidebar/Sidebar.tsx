import styles from './Sidebar.module.scss'

import { Search } from './Search/Search'

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
    </div>
  )
}
