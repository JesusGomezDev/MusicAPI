import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'admin',
            password: 'admin',
            database: 'MusicDB',
            autoLoadEntities: true,
            synchronize: true,
            driver: require('mysql2'),
        }),
        TracksModule,
        ArtistsModule,
        AlbumsModule,
    ],
})
export class AppModule {}