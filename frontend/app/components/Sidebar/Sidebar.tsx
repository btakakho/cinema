import styles from './Sidebar.module.scss'

import { MoviesContainer } from './MoviesContainer/MoviesContainer'
import { Search } from './Search/Search'

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
      <MoviesContainer />
    </div>
  )
}
