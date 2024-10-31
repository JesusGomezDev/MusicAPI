import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AlbumsController } from './albumes.controller';
import { AlbumesService } from './albumes.service';
import { Album } from './album.entity';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AlbumResolver } from './albumes.resolver';
import { ApiKeysService } from 'src/api_keys/api_keys.service';
import { ApiKeysGuard } from 'src/api_keys/api_keys.guard';
import { ApiKey } from 'src/api_keys/api_key.entity';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forFeature([Album, ApiKey])],
  providers: [AlbumesService, AlbumResolver, ApiKeysService, ApiKeysGuard],
  controllers: [AlbumsController],
})
export class AlbumsModule {}