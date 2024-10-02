import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AlbumsController } from './albumes.controller';
import { AlbumesService } from './albumes.service';
import { Album } from './album.entity';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AlbumResolver } from './albumes.resolver';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forFeature([Album])],
  providers: [AlbumesService, AlbumResolver],
  controllers: [AlbumsController],
})
export class AlbumsModule {}