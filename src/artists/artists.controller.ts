import { Controller, Get, Post, Put, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { Artist } from './artist.entity';
import { ArtistInput, PaginatedArtists } from './artist.models';
import { ArtistsService } from './artists.service';


class UpdateArtistDto {
    id: number;
    artist: ArtistInput;
}

@Controller('/artists')
export class ArtistsController {

    constructor(private artistsService: ArtistsService) {}

    @Get()
    async getArtists(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
        @Query('offset') offset?: number,
    ): Promise<PaginatedArtists> {
        return this.artistsService.getArtists(page, limit, offset);
    }

    @Get(':id')
    async getArtist(@Param('id') id: number) {
        return this.artistsService.getArtist(id);
    }

    @Get('/name/:name')
    async getArtistByName(@Param('name') name: string): Promise<Artist> {
        return this.artistsService.getArtistByName(name);
    }

    @Post()
    async createArtist(@Body() artist: ArtistInput) {
        return this.artistsService.postArtist(artist);
    }

    @Put()
    async updateArtist(@Body() updateArtistDto: UpdateArtistDto): Promise<Artist> {
        const { id, artist } = updateArtistDto;
        return this.artistsService.partialUpdateArtist(id, artist);
    }

    @Patch()
    async partialUpdateArtist(@Body() updateArtistDto: UpdateArtistDto): Promise<Artist> {
        const { id, artist } = updateArtistDto;
        return this.artistsService.partialUpdateArtist(id, artist);
    }

    @Delete(':id')
    async deleteArtist(@Param('id') id: number) {
        return this.artistsService.deleteArtist(id);
    }
}
