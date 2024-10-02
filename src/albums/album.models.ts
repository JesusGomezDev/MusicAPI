import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';

export interface AlbumInterface {
    id: number;
    artist: string;
    title: string;
    playcount: number;
}

export interface PaginatedAlbumes {
    data: AlbumInterface[];
    limit: number;
    total: number;
    page: number;
    totalPages: number;
}

@ObjectType()
export class AlbumType {
    @Field(type => Int)
    id: number;

    @Field()
    artist: string;

    @Field()
    title: string;

    @Field()
    playcount: number;
}

@ObjectType()
export class PaginatedAlbumType {
    @Field(type => [AlbumType])
    data: AlbumType[];

    @Field(type => Int)
    limit: number;

    @Field(type => Int)
    total: number;

    @Field(type => Int)
    page: number;

    @Field(type => Int)
    totalPages: number;
}

@InputType()
export class AlbumInput {
    @Field()
    artist: string;

    @Field()
    title: string;

    @Field()
    playcount: number;
}