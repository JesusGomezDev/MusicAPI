import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsResolver } from './artists.resolver';
import { Artist } from './artist.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ArtistsController } from 'src/artists/artists.controller';
import { ArtistsService } from './artists.service';
import { ApiKeysService } from 'src/api_keys/api_keys.service';
import { ApiKey } from 'src/api_keys/api_key.entity';
import { ApiKeysGuard } from 'src/api_keys/api_keys.guard';


@Module({
    imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
      TypeOrmModule.forFeature([Artist, ApiKey])],
    providers: [ArtistsService, ArtistsResolver, ApiKeysService, ApiKeysGuard],
    controllers: [ArtistsController],
})
export class ArtistsModule {}