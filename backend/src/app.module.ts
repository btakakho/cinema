import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { ActorModule } from './actor/actor.module'
import { AuthModule } from './auth/auth.module'
import { getMongoDbConfig } from './config/mongo.config'
import { FileModule } from './file/file.module'
import { GenreModule } from './genre/genre.module'
import { UserModule } from './user/user.module'
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { MovieModule } from './movie/movie.module';

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
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class AppModule {}
