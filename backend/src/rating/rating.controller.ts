import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorator'
import { IdValidationPipe } from 'src/user/pipes/id-validation.pipes'
import { SetRatingDto } from './dto/set-rating.dto'
import { RatingService } from './rating.service'

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':movieId')
  @Auth()
  async getMovieValueByUser(
    @Param('movieId', IdValidationPipe) movieId: Types.ObjectId,
    @User('_id') userId: Types.ObjectId,
  ) {
    return this.ratingService.getMovieValueByUser(movieId, userId)
  }

  @Post('set-rating')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  async setRating(
    @User('_id') userId: Types.ObjectId,
    @Body() dto: SetRatingDto,
  ) {
    return this.ratingService.setRating(userId, dto)
  }
}
