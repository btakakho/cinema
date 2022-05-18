import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/ui/Icon'

import { IMovie } from '@/shared/types/movie.types'

import { getGenresListEach } from '@/utils/movie/getGenresListEach'

import styles from './MovieList.module.scss'

import { getGenreUrl, getMovieUrl } from '@/config/url.config'

interface IProps {
  movie: IMovie
}

export const MovieItem = ({ movie }: IProps) => {
  return (
    <div className={styles.item}>
      <Link href={getMovieUrl(movie.slug)}>
        <a>
          <Image
            src={movie.poster}
            width={65}
            height={97}
            draggable={false}
            alt={movie.title}
            priority
          />
        </a>
      </Link>
      <div className={styles.info}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.genres}>
          {movie.genres.map((genre, index) => (
            <Link key={genre._id} href={getGenreUrl(genre.slug)}>
              <a>{getGenresListEach(index, movie.genres.length, genre.name)}</a>
            </Link>
          ))}
        </div>
        <div className={styles.rating}>
          <Icon name="MdStarRate" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}
