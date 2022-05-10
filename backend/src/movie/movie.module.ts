import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { MovieController } from './movie.controller'
import { MovieModel } from './movie.model'
import { MovieService } from './movie.service'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MovieModel,
        schemaOptions: {
          collection: 'Movie',
        },
      },
    ]),
  ],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
