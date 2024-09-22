import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';

export interface ArtistInterface {
    id: number;
    name: string;
    listeners: number;
    playcount: number;
}

export interface PaginatedArtists {
    data: ArtistInterface[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@ObjectType()
export class ArtistType {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    listeners: number;

    @Field()
    playcount: number;
}

@ObjectType()
export class PaginatedArtistsType {
    @Field(type => [ArtistType])
    data: ArtistType[];

    @Field(type => Int)
    total: number;

    @Field(type => Int)
    page: number;

    @Field(type => Int)
    limit: number;

    @Field(type => Int)
    totalPages: number;
}

@InputType()
export class ArtistInput {
    @Field()
    name: string;

    @Field()
    listeners: number;

    @Field()
    playcount: number;
}