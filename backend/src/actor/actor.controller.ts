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
import { ActorService } from './actor.service'
import { ActorDto } from './dto/actor.dto'

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.actorService.getAll(searchTerm)
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.actorService.bySlug(slug)
  }

  @Post()
  @HttpCode(200)
  @Auth('admin')
  async createActor() {
    return this.actorService.create()
  }

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id', IdValidationPipe) id: string) {
    return this.actorService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateActor(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ActorDto,
  ) {
    return this.actorService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async deleteActor(@Param('id', IdValidationPipe) id: string) {
    return this.actorService.delete(id)
  }
}
