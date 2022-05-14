import { MaterialIconNameType } from './icons.types'

export interface IGenre {
  _id: string
  name: string
  slug: string
  description: string
  icon: MaterialIconNameType
}

export interface IParameters {
  year: number
  duration: number
  coutry: string
}

export interface IActor {
  _id: string
  photo: string
  name: string
  views: string
  slug: string
}

export interface IMovie {
  _id: string
  poster: string
  bigPoster: string
  title: string
  parameters: IParameters
  genres: IGenre[]
  actors: IActor[]
  views: number
  videoUrl: string
  rating: number
  slug: string
}
