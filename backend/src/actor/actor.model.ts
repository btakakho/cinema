import { Prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface ActorModel extends Base {}

export class ActorModel extends TimeStamps {
  @Prop()
  name: string

  @Prop({ unique: true })
  slug: string

  @Prop()
  photo: string
}
