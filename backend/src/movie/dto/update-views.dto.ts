import { IsString } from 'class-validator'

export class UpdateMovieViewsDto {
  @IsString()
  slug: string
}
