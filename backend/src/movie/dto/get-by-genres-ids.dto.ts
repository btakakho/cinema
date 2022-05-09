import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator'
import { Types } from 'mongoose'

export class GetByGenresIdsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  genresIds: Types.ObjectId[]
}
