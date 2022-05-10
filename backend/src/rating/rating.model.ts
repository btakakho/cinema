import { Prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'
import { UserModel } from 'src/user/user.model'

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
  @Prop({ ref: () => UserModel })
  userId: Ref<UserModel>

  @Prop({ ref: () => MovieModel })
  movieId: Ref<MovieModel>

  @Prop()
  value: number
}
