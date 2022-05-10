import { Prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @Prop({ unique: true })
  email: string

  @Prop()
  password: string

  @Prop({ default: false })
  isAdmin?: boolean

  @Prop({ default: [], ref: () => MovieModel })
  favorites?: Ref<MovieModel>[]
}
