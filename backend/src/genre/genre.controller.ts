import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/user/pipes/id-validation.pipes'
import { CreateGenreDto } from './dto/create-genre.dto'
import { GenreService } from './genre.service'

@Controller('genres')
export class GenreController {
  constructor(private readonly genreServiсe: GenreService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.genreServiсe.getAll(searchTerm)
  }

  @Get('collections')
  async getCollections() {
    return this.genreServiсe.getCollections()
  }

  @Get('by-slug/:slug')
  @Auth()
  async getBySlug(@Param('slug') slug: string) {
    return this.genreServiсe.bySlug(slug)
  }

  @Post()
  @HttpCode(200)
  @Auth('admin')
  async createGenre() {
    return this.genreServiсe.create()
  }

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id', IdValidationPipe) id: string) {
    return this.genreServiсe.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateGenre(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateGenreDto,
  ) {
    return this.genreServiсe.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async deleteGenre(@Param('id', IdValidationPipe) id: string) {
    return this.genreServiсe.delete(id)
  }
}
