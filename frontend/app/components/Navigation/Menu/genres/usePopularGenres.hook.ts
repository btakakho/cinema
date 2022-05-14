import { useQuery } from 'react-query'

import { GenreService } from '@/services/genre.service'

import { IMenuItem } from '../menu.interface'

import { getGenreUrl } from '@/config/url.config'

export const usePopularGenres = () => {
  const queryData = useQuery(
    'popular genre menu',
    () => GenreService.getAll(),
    {
      select: ({ data }) =>
        data
          .map<IMenuItem>((genre) => ({
            icon: genre.icon,
            link: getGenreUrl(genre.slug),
            title: genre.name,
          }))
          .splice(0, 4),
      onError(error) {
        console.error(error)
      },
    },
  )

  return queryData
}
