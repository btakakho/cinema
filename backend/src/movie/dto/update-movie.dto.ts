import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

export class Parameters {
  @IsNumber()
  year: number

  @IsNumber()
  duration: number

  @IsString()
  country: string
}

export class UpdateMovieDto {
  @IsString()
  title: string

  @IsString()
  slug: string

  @IsString()
  poster: string

  @IsString()
  bigPoster: string

  // @IsString()
  // description: string

  @IsOptional()
  @IsObject()
  paramaters?: Parameters

  @IsString()
  videoUrl: string

  @IsArray()
  @IsMongoId({ each: true })
  genres: string[]

  @IsArray()
  @IsMongoId({ each: true })
  actors: string[]

  @IsOptional()
  @IsBoolean()
  isSendTelegram?: boolean
}
