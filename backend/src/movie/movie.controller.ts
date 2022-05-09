import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/user/pipes/id-validation.pipes'
import { GetByGenresIdsDto } from './dto/get-by-genres-ids.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { UpdateMovieViewsDto } from './dto/update-views.dto'
import { MovieService } from './movie.service'

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm)
  }

  @Get('most-popular')
  async getMostPopularMovies() {
    return this.movieService.getMostPopularMovies()
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.movieService.bySlug(slug)
  }

  @Get('by-actor/:actorId')
  async getByActorId(
    @Param('actorId', IdValidationPipe) actorId: Types.ObjectId,
  ) {
    return this.movieService.byActor(actorId)
  }

  @UsePipes(new ValidationPipe())
  @Post('by-genres')
  @HttpCode(200)
  async getByGenres(@Body() dto: GetByGenresIdsDto) {
    return this.movieService.byGenre(dto)
  }

  @UsePipes(new ValidationPipe())
  @Patch('update-views')
  @HttpCode(200)
  async updateCountViews(@Body() dto: UpdateMovieViewsDto) {
    return this.movieService.updateViews(dto)
  }

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id', IdValidationPipe) id: string) {
    return this.movieService.byId(id)
  }

  @Post()
  @HttpCode(200)
  @Auth('admin')
  async createMovie() {
    return this.movieService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateMovie(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async deleteMovie(@Param('id', IdValidationPipe) id: string) {
    return this.movieService.delete(id)
  }
}
