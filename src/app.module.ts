import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albumes.module';
import { TracksModule } from './tracks/tracks.module';
import { ApiKeysModule } from './api_keys/api_keys.module';
import dataSource from './data-source';

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSource.options),
        TracksModule,
        ArtistsModule,
        AlbumsModule,
        ApiKeysModule,
    ],
})
export class AppModule {}