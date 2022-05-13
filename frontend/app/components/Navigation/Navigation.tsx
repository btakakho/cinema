import { Logo } from './Logo'
import { MenuContainer } from './Menu/MenuContainer'
import styles from './Navigation.module.scss'

export const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <Logo />
      <MenuContainer />
    </div>
  )
}
