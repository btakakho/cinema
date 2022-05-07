import { Prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface GenreModel extends Base {}

export class GenreModel extends TimeStamps {
  @Prop({ unique: true })
  name: string

  @Prop({ unique: true })
  slug: string

  @Prop()
  description: string

  @Prop()
  icon: string
}
