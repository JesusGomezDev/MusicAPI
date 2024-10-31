import { Controller, Get, Post, Put, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { PaginatedTracks, TrackInterface, TracksService } from './tracks.service';
import { ApiKeysGuard } from 'src/api_keys/api_keys.guard';

@Controller('/tracks')
export class TracksController {

    constructor(private tracksService: TracksService) {}

    @Get()
    @UseGuards(ApiKeysGuard)
    async getTracks(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
    ): Promise<PaginatedTracks> {
        return this.tracksService.getTracks(page, limit);
    }

    @Get(':id')
    @UseGuards(ApiKeysGuard)
    getTrack(@Param('id') id:string) {
        return this.tracksService.getTrack(parseInt(id));
    }

    @Post()
    @UseGuards(ApiKeysGuard)
    postTrack(@Body() track:TrackInterface) {
        return this.tracksService.postTrack(track);
    }
}
