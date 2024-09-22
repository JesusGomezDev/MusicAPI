import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../tracks/track.entity';

import { TracksController } from './tracks.controller';
import { TracksResolver } from './tracks.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TracksService } from './tracks.service';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        TypeOrmModule.forFeature([Track])
    ],
    providers: [TracksService, TracksResolver],
    controllers: [TracksController],
})
export class TracksModule {}