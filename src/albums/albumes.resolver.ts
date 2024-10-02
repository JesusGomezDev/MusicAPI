import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AlbumesService } from './albumes.service';
import { AlbumInput, AlbumType, PaginatedAlbumes, PaginatedAlbumType } from './album.models';

@Resolver(of => AlbumType)
export class AlbumResolver {
    constructor(private albumesService: AlbumesService) {}

    @Query(returns => PaginatedAlbumType)
    getAlbums(
        @Args('page', { type: () => Int, nullable: true }) page: number = 1,
        @Args('limit', { type: () => Int, nullable: true }) limit: number = 20,
        @Args('offset', { type: () => Int, nullable: true }) offset?: number,
    ): Promise<PaginatedAlbumes> {
        return this.albumesService.getAlbumes(page, limit, offset);
    }

    @Query(returns => AlbumType)
    getAlbum(
        @Args('id', { type: () => Int, nullable: true }) id: number,
    ): Promise<AlbumType> {
        return this.albumesService.getAlbum(id);
    }

    @Query(returns => AlbumType)
    getAlbumByTitle(
        @Args('title', { type: () => String, nullable: true}) title: string,
    ): Promise<AlbumType> {
        return this.albumesService.getAlbumesByTitle(title);
    }

    @Query(returns => PaginatedAlbumType)
    getAlbumByArtist(
        @Args('artist') artist: string,
    ): Promise<PaginatedAlbumes> {
        return this.albumesService.getAlbumesByArtist(artist);
    }

    @Mutation(returns => AlbumType)
    createAlbum(
        @Args('artist') artist: string,
        @Args('title') title: string,
        @Args('playcount', { type: () => Int }) playcount: number
    ): Promise<AlbumType> {
        const albumInput: AlbumInput = { artist, title, playcount };
        return this.albumesService.postAlbum(albumInput);
    }

    @Mutation(returns => AlbumType)
    updateAlbum(
        @Args('id', { type: () => Int }) id: number,
        @Args('artist') artist: string,
        @Args('title') title: string,
        @Args('playcount', { type: () => Int }) playcount: number
    ): Promise<AlbumType> {
        const albumInput: AlbumInput = { artist, title, playcount };
        return this.albumesService.updateAlbum(id, albumInput);
    }

    @Mutation(returns => AlbumType)
    partialUpdateAlbum(
        @Args('id', { type: () => Int }) id: number,
        @Args('artist', { nullable: true }) artist?: string,
        @Args('title', { nullable: true }) title?: string,
        @Args('playcount', { type: () => Int, nullable: true }) playcount?: number
    ): Promise<AlbumType> {
        const albumInput: Partial<AlbumInput> = { artist, title, playcount };
        return this.albumesService.partialUpdateAlbum(id, albumInput);
    }

    @Mutation(returns => AlbumType)
    deleteAlbum(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<AlbumType> {
        return this.albumesService.deleteAlbum(id);
    }
}