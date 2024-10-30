import { Controller, Get, Post, Put, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { Artist } from './artist.entity';
import { ArtistInput, PaginatedArtists } from './artist.models';
import { ArtistsService } from './artists.service';
import { ApiKeysGuard } from 'src/api_keys/api_keys.guard';


class UpdateArtistDto {
    id: number;
    artist: ArtistInput;
}

@Controller('/artists')
export class ArtistsController {

    constructor(private artistsService: ArtistsService) {}

    @Get()
    @UseGuards(ApiKeysGuard)
    async getArtists(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
        @Query('offset') offset?: number,
    ): Promise<PaginatedArtists> {
        return this.artistsService.getArtists(page, limit, offset);
    }

    @Get(':id')
    @UseGuards(ApiKeysGuard)
    async getArtist(@Param('id') id: number) {
        return this.artistsService.getArtist(id);
    }

    @Get('/name/:name')
    @UseGuards(ApiKeysGuard)
    async getArtistByName(@Param('name') name: string): Promise<Artist> {
        return this.artistsService.getArtistByName(name);
    }

    @Post()
    @UseGuards(ApiKeysGuard)
    async createArtist(@Body() artist: ArtistInput) {
        return this.artistsService.postArtist(artist);
    }

    @Put()
    @UseGuards(ApiKeysGuard)
    async updateArtist(@Body() updateArtistDto: UpdateArtistDto): Promise<Artist> {
        const { id, artist } = updateArtistDto;
        return this.artistsService.partialUpdateArtist(id, artist);
    }

    @Patch()
    @UseGuards(ApiKeysGuard)
    async partialUpdateArtist(@Body() updateArtistDto: UpdateArtistDto): Promise<Artist> {
        const { id, artist } = updateArtistDto;
        return this.artistsService.partialUpdateArtist(id, artist);
    }

    @Delete(':id')
    @UseGuards(ApiKeysGuard)
    async deleteArtist(@Param('id') id: number) {
        return this.artistsService.deleteArtist(id);
    }
}
