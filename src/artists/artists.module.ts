import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsResolver } from './artists.resolver';
import { Artist } from './artist.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ArtistsController } from 'src/artists/artists.controller';
import { ArtistsService } from './artists.service';


@Module({
    imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
      TypeOrmModule.forFeature([Artist])],
    providers: [ArtistsService, ArtistsResolver],
    controllers: [ArtistsController],
})
export class ArtistsModule {}