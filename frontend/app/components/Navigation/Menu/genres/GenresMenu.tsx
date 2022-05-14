import { usePopularGenres } from './usePopularGenres.hook'

import { Menu } from '../Menu'

export const GenresMenu = () => {
  const { isLoading, data } = usePopularGenres()

  return isLoading ? (
    <div className="mx-11 mb-6">Loading...</div>
  ) : (
    <Menu menu={{ title: 'Popular genres', items: data || [] }} />
  )
}
