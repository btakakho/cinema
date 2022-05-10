import { IsInt, IsMongoId, IsNumber, Max, Min } from 'class-validator'
import { Types } from 'mongoose'

export class SetRatingDto {
  @IsMongoId()
  movieId: Types.ObjectId

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsInt()
  value: number
}
