import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Icon } from '@/components/ui/Icon'

import styles from './Menu.module.scss'

import { IMenuItem } from './menu.interface'

interface IProps {
  item: IMenuItem
}

export const MenuItem = ({ item }: IProps) => {
  const { asPath } = useRouter()

  return (
    <li
      className={classNames({
        [styles.active]: asPath === item.link,
      })}
    >
      <Link href={item.link}>
        <a>
          <Icon name={item.icon} />
          <span>{item.title}</span>
        </a>
      </Link>
    </li>
  )
}
