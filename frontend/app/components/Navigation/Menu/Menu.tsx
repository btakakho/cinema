import { AuthItems } from './auth/AuthItems'
import { IMenu } from './menu.interface'
import styles from './Menu.module.scss'
import { MenuItem } from './MenuItem'



interface IProps {
  menu: IMenu
}

export const Menu = ({ menu: { items, title } }: IProps) => {
  return (
    <div className={styles.menu}>
      <div className={styles.heading}>{title}</div>
      <ul className={styles.list}>
        {items.map((item) => (
          <MenuItem item={item} key={item.link} />
        ))}
        {title === 'GENERAL' ? <AuthItems /> : null}
      </ul>
    </div>
  )
}
