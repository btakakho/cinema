import Link from 'next/link'

import styles from './MovieList.module.scss'

import { IMovieList } from './movie-list.interface'

import { MovieItem } from './MovieItem'

export const MovieList = ({ link, movies, title }: IMovieList) => {
  return (
    <div className={styles.list}>
      <div className={styles.heading}>{title}</div>
      {movies.map((movie) => (
        <MovieItem key={movie._id} movie={movie} />
      ))}
      <Link href={link}>
        <a className={styles.button}>See more</a>
      </Link>
    </div>
  )
}
