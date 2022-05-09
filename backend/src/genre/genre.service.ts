import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateGenreDto } from './dto/create-genre.dto'
import { GenreModel } from './genre.model'

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>,
  ) {}

  async bySlug(slug: string) {
    const genre = await this.genreModel.findOne({ slug }).exec()

    if (!genre) throw new NotFoundException('Genre with this slug not found')

    return genre
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { slug: new RegExp(searchTerm, 'i') },
          { description: new RegExp(searchTerm, 'i') },
        ],
      }
    }

    return this.genreModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec()
  }

  async getCollections() {
    const genres = await this.getAll()

    const collections = genres

    return collections
  }

  async byId(id: string) {
    const genre = await this.genreModel.findById(id).exec()

    if (!genre) throw new NotFoundException('Genre not found')

    return genre
  }

  async create() {
    const defaultValue: CreateGenreDto = {
      description: '',
      name: '',
      slug: '',
      icon: '',
    }

    const genre = await this.genreModel.create(defaultValue)

    return genre._id
  }

  async update(id: string, dto: CreateGenreDto) {
    const genre = await this.genreModel
      .findOne()
      .or([{ name: dto.name }, { slug: dto.slug }])
      .exec()

    if (genre && genre.id !== id) {
      throw new BadRequestException(
        'Genre with this name or slug is already exists',
      )
    }

    const updateGenre = await this.genreModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec()
      .catch((error) => new ConflictException(error))

    if (!updateGenre) throw new NotFoundException('Genre not found')

    return updateGenre
  }

  async delete(id: string) {
    const deleteGenre = await this.genreModel.findByIdAndDelete(id).exec()

    if (!deleteGenre) throw new NotFoundException('Genre not found')

    return deleteGenre
  }
}
