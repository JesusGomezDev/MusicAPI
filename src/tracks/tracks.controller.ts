import { Controller, Get, Post, Put, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { PaginatedTracks, TrackInterface, TracksService } from './tracks.service';

@Controller('/tracks')
export class TracksController {

    constructor(private tracksService: TracksService) {}

    @Get()
    async getTracks(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
    ): Promise<PaginatedTracks> {
        return this.tracksService.getTracks(page, limit);
    }

    @Get(':id')
    getTrack(@Param('id') id:string) {
        return this.tracksService.getTrack(parseInt(id));
    }

    @Post()
    postTrack(@Body() track:TrackInterface) {
        return this.tracksService.postTrack(track);
    }
}
