import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { MovieService } from 'src/movie/movie.service'
import { CreateGenreDto } from './dto/create-genre.dto'
import { ICollection } from './genre.interface'
import { GenreModel } from './genre.model'

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>,
    private readonly movieService: MovieService,
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

    const collections = await Promise.all(
      genres.map(async (genre) => {
        const moviesByGenre = await this.movieService.byGenre({
          genresIds: [genre._id],
        })

        const result: ICollection = {
          _id: String(genre._id),
          image: moviesByGenre.at(0)?.bigPoster ?? '',
          slug: genre.slug,
          title: genre.name,
        }
        return result
      }),
    )
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
