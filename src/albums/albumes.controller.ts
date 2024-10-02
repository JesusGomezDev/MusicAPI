import { Controller, Get, Post, Put, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { Album } from './album.entity';
import { AlbumInput, PaginatedAlbumes } from './album.models';
import { AlbumesService } from './albumes.service';

class UpdateAlbumDto {
    id: number;
    album: AlbumInput;
}

@Controller('/albumes')
export class AlbumsController {

    constructor(private albumesService: AlbumesService) {}

    @Get()
    async getAlbums(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
        @Query('offset') offset?: number,
    ): Promise<PaginatedAlbumes> {
        return this.albumesService.getAlbumes(page, limit, offset);
    }

    @Get(':id')
    async getAlbum(@Param('id') id: number) {
        return this.albumesService.getAlbum(id);
    }

    @Get('/title/:title')
    async getAlbumByTitle(@Param('title') title: string): Promise<Album> {
        return this.albumesService.getAlbumesByTitle(title);
    }

    @Get('artist/:artist')
    async getAlbumesByArtist(
        @Param('artist') artist: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<PaginatedAlbumes> {
        return this.albumesService.getAlbumesByArtist(artist, page, limit);
    }

    @Post()
    async createAlbum(@Body() album: AlbumInput) {
        return this.albumesService.postAlbum(album);
    }

    @Put()
    async updateAlbum(@Body() updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        const { id, album } = updateAlbumDto;
        return this.albumesService.partialUpdateAlbum(id, album);
    }

    @Patch()
    async partialUpdateAlbum(@Body() updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        const { id, album } = updateAlbumDto;
        return this.albumesService.partialUpdateAlbum(id, album);
    }

    @Delete(':id')
    async deleteAlbum(@Param('id') id: number) {
        return this.albumesService.deleteAlbum(id);
    }
}
