import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TrackType {
    @Field(type => Int)
    id: number;

    @Field()
    artist: string;

    @Field()
    album: string;

    @Field()
    title: string;
}

@ObjectType()
export class PaginatedTracksType {
    @Field(type => [TrackType])
    data: TrackType[];

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
export class TrackInput {
    @Field()
    title: string;

    @Field()
    artist: string;

    @Field()
    album: string;
}