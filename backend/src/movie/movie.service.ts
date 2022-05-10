import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { GetByGenresIdsDto } from './dto/get-by-genres-ids.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { UpdateMovieViewsDto } from './dto/update-views.dto'
import { MovieModel } from './movie.model'

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>,
  ) {}

  async bySlug(slug: string) {
    const movie = await this.movieModel
      .findOne({ slug })
      .populate('actors genres', '-createdAt -updatedAt -__v')
      .exec()

    if (!movie) throw new NotFoundException('Movie with this slug not found')

    return movie
  }

  async byActor(actorId: Types.ObjectId) {
    const movies = await this.movieModel.find({ actors: actorId }).exec()

    if (!movies.length)
      throw new NotFoundException('Movies with this actorId not found')

    return movies
  }

  async byGenre({ genresIds }: GetByGenresIdsDto) {
    const movies = await this.movieModel
      .find({ genres: { $in: genresIds } })
      .exec()

    return movies
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [{ title: new RegExp(searchTerm, 'i') }],
      }
    }

    return this.movieModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .populate('actors genres', '-createdAt -updatedAt -__v')
      .exec()
  }

  async getMostPopularMovies() {
    return await this.movieModel
      .find({ views: { $gt: 0 } })
      .sort({ views: 'desc' })
      .populate('genres', '-createdAt -updatedAt -__v')
      .exec()
  }

  async byId(id: string) {
    const movie = await this.movieModel.findById(id).exec()

    if (!movie) throw new NotFoundException('Movie not found')

    return movie
  }

  async create() {
    const defaultValue: UpdateMovieDto = {
      title: '',
      slug: '',
      poster: '',
      bigPoster: '',
      videoUrl: '',
      genres: [],
      actors: [],
    }

    const movie = await this.movieModel.create(defaultValue)

    return movie._id
  }

  async updateViews({ slug }: UpdateMovieViewsDto) {
    const movie = await this.movieModel
      .findOneAndUpdate(
        { slug },
        {
          $inc: { views: 1 },
        },
        {
          new: true,
        },
      )
      .exec()

    if (!movie) throw new NotFoundException('Movie not found')

    return movie
  }

  async updateRating(id: Types.ObjectId, newRating: number) {
    return await this.movieModel
      .findByIdAndUpdate(
        id,
        {
          rating: newRating,
        },
        { new: true },
      )
      .exec()
  }

  async update(id: string, dto: UpdateMovieDto) {
    const movie = await this.movieModel.findOne({ slug: dto.slug }).exec()

    if (movie && movie.id !== id) {
      throw new BadRequestException('Movie with this slug is already exists')
    }

    const updateMovie = await this.movieModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec()
      .catch((error) => new ConflictException(error))

    if (!updateMovie) throw new NotFoundException('Movie not found')

    return updateMovie
  }

  async delete(id: string) {
    const deleteMovie = await this.movieModel.findByIdAndDelete(id).exec()

    if (!deleteMovie) throw new NotFoundException('Movie not found')

    return deleteMovie
  }
}
