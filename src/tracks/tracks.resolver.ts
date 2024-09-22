import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaginatedTracksType, TrackInput, TrackType } from './track.models';
import { TracksService } from './tracks.service';
;

@Resolver(of => TrackType)
export class TracksResolver {
    constructor(private readonly tracksService: TracksService) {}

    @Query(returns => PaginatedTracksType)
    getTracks(
        @Args('page', { type: () => Int, nullable: true }) page: number = 1,
        @Args('limit', { type: () => Int, nullable: true }) limit: number = 20,
    ): Promise<PaginatedTracksType> {
        return this.tracksService.getTracks(page, limit);
    }

    @Query(returns => TrackType)
    getTrack(@Args('id', { type: () => Int }) id: number): Promise<TrackType> {
        return this.tracksService.getTrack(id);
    }

    @Mutation(returns => TrackType)
    postTrack(@Args('track') track: TrackInput): Promise<TrackType> {
        return this.tracksService.postTrack(track);
    }
}