import classNames from 'classnames'

import styles from 'Button.module.scss'

import { IButton } from './form.interface'

export const Button = ({ children, className, ...rest }: IButton) => {
  return (
    <button className={classNames(styles.button, className)} {...rest}>
      {children}
    </button>
  )
}
