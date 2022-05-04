import { Prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @Prop({ unique: true })
  email: string

  @Prop()
  password: string

  @Prop({ default: false })
  isAdmin?: boolean

  @Prop({ default: [] })
  favorites?: []
}
