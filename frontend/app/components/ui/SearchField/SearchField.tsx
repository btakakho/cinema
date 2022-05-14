import { ChangeEvent } from 'react'

import { Icon } from '@/ui/Icon'

import styles from './SearchField.module.scss'

interface IProps {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SearchField = ({ searchTerm, handleSearch }: IProps) => {
  return (
    <div className={styles.search}>
      <Icon name="MdSearch" />
      <input placeholder="Search" value={searchTerm} onChange={handleSearch} />
    </div>
  )
}
