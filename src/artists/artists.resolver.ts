
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaginatedArtistsType, ArtistType, ArtistInput } from './artist.models';
import { ArtistsService } from './artists.service';

@Resolver(of => ArtistType)
export class ArtistsResolver {
    constructor(private artistsService: ArtistsService) {}

    @Query(returns => PaginatedArtistsType)
    getArtists(
        @Args('page', { type: () => Int, nullable: true }) page: number = 1,
        @Args('limit', { type: () => Int, nullable: true }) limit: number = 20,
        @Args('offset', { type: () => Int, nullable: true }) offset?: number,
    ): Promise<PaginatedArtistsType> {
        return this.artistsService.getArtists(page, limit, offset);
    }

    @Query(returns => ArtistType)
    getAritst(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<ArtistType> {
        return this.artistsService.getArtist(id);
    }

    @Query(returns => ArtistType)
    getArtistByName(
        @Args('name') name: string,
    ): Promise<ArtistType> {
        return this.artistsService.getArtistByName(name);
    }

    @Mutation(returns => ArtistType)
    createArtist(
        @Args('name') name: string,
        @Args('listeners') listeners: number,
        @Args('playcount') playcount: number,
    ): Promise<ArtistType> {
        const artistInput: ArtistInput = { name, listeners, playcount };
        return this.artistsService.postArtist(artistInput);
    }

    @Mutation(returns => ArtistType)
    updateArtist(
        @Args('id', { type: () => Int }) id: number,
        @Args('name') name: string,
        @Args('listeners', { type: () => Int }) listeners: number,
        @Args('playcount', { type: () => Int }) playcount: number,
    ): Promise<ArtistType> {
        const artistInput: ArtistInput = { name, listeners, playcount };
        return this.artistsService.updateArtist(id, artistInput);
    }

    @Mutation(returns => ArtistType)
    partialUpdateArtist(
        @Args('id', { type: () => Int }) id: number,
        @Args('name', { nullable: true }) name?: string,
        @Args('listeners', { type: () => Int, nullable: true }) listeners?: number,
        @Args('playcount', { type: () => Int, nullable: true }) playcount?: number,
    ): Promise<ArtistType> {
        const artistInput: Partial<ArtistInput> = { name, listeners, playcount };
        return this.artistsService.partialUpdateArtist(id, artistInput);
    }

    @Mutation(returns => ArtistType)
    deleteArtist(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<ArtistType> {
        return this.artistsService.deleteArtist(id);
    }
}