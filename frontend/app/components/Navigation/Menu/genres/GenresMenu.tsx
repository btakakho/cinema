import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import { usePopularGenres } from './usePopularGenres.hook'

import { Menu } from '../Menu'

export const GenresMenu = () => {
  const { isLoading, data } = usePopularGenres()

  return isLoading ? (
    <div className="mx-11 mb-6">
      <SkeletonLoader count={5} className="h-7 mt-6" />
    </div>
  ) : (
    <Menu menu={{ title: 'Popular genres', items: data || [] }} />
  )
}
