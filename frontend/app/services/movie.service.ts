import { IMovie } from '@/shared/types/movie.types'

import { axiosClassic } from '@/api/interceptors'

import { getMoviesUrl } from '@/config/api.config'

export const MovieService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IMovie[]>(getMoviesUrl(), {
      params: searchTerm ? { searchTerm } : {},
    })
  },
}
