import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ActorModel } from './actor.model'
import { ActorDto } from './dto/actor.dto'

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(ActorModel) private readonly actorModel: ModelType<ActorModel>,
  ) {}

  async bySlug(slug: string) {
    const actor = await this.actorModel.findOne({ slug }).exec()

    if (!actor) throw new NotFoundException('Actor with this slug not found')

    return actor
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { slug: new RegExp(searchTerm, 'i') },
        ],
      }
    }

    return this.actorModel
      .aggregate()
      .match(options)
      .lookup({
        from: 'Movie',
        localField: '_id',
        foreignField: 'actors',
        as: 'movies',
      })
      .addFields({
        countMovies: {
          $size: '$movies',
        },
      })
      .project({ __v: false, updatedAt: false, movies: false })
      .sort({ createdAt: -1 })
      .exec()
  }

  async byId(id: string) {
    const actor = await this.actorModel.findById(id).exec()

    if (!actor) throw new NotFoundException('Actor not found')

    return actor
  }

  async create() {
    const defaultValue: ActorDto = {
      name: '',
      slug: '',
      photo: '',
    }

    const actor = await this.actorModel.create(defaultValue)

    return actor._id
  }

  async update(id: string, dto: ActorDto) {
    const actor = await this.actorModel.findOne({ slug: dto.slug }).exec()

    if (actor && actor.id !== id) {
      throw new BadRequestException('Actor with this slug is already exists')
    }

    const updateActor = await this.actorModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec()
      .catch((error) => new ConflictException(error))

    if (!updateActor) throw new NotFoundException('Actor not found')

    return updateActor
  }

  async delete(id: string) {
    const deleteActor = await this.actorModel.findByIdAndDelete(id).exec()

    if (!deleteActor) throw new NotFoundException('Actor not found')

    return deleteActor
  }
}
