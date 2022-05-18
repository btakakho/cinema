import { FavoriteMovies } from './FavoriteMovies/FavoriteMovies'
import { PopularMovies } from './PopularMovies'

export const MoviesContainer = () => {
  return (
    <div>
      <PopularMovies />
      <FavoriteMovies />
    </div>
  )
}
