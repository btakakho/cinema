import { Prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ActorModel } from 'src/actor/actor.model'
import { GenreModel } from 'src/genre/genre.model'

export interface MovieModel extends Base {}

export class Parameters {
  @Prop()
  year: number

  @Prop()
  duration: number

  @Prop()
  country: string
}

export class MovieModel extends TimeStamps {
  @Prop()
  title: string

  @Prop({ unique: true })
  slug: string

  @Prop()
  poster: string

  @Prop()
  bigPoster: string

  // @Prop()
  // description: string

  @Prop()
  paramaters?: Parameters

  @Prop({ default: 0.0 })
  rating?: number

  @Prop()
  videoUrl: string

  @Prop({ default: 0 })
  views?: number

  @Prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[]

  @Prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[]

  @Prop({ default: false })
  isSendTelegram?: boolean
}
