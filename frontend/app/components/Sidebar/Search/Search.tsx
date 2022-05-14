import { SearchField } from '@/ui/SearchField/SearchField'

import styles from './Search.module.scss'

import { SearchList } from './SearchList/SearchList'
import { useSearch } from './useSearch.hook'

export const Search = () => {
  const { isSuccess, data, handleSearch, searchTerm } = useSearch()

  return (
    <div className={styles.wrapper}>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
      {isSuccess && <SearchList movies={data || []} />}
    </div>
  )
}
