import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { ActorModule } from './actor/actor.module'
import { AuthModule } from './auth/auth.module'
import { getMongoDbConfig } from './config/mongo.config'
import { FileModule } from './file/file.module'
import { GenreModule } from './genre/genre.module'
import { MovieModule } from './movie/movie.module'
import { RatingModule } from './rating/rating.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    AuthModule,
    UserModule,
    GenreModule,
    FileModule,
    ActorModule,
    MovieModule,
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
