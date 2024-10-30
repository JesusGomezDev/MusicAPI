import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';

export interface ApiKeyInterface {
    id: number;
    user: string;
    email: string;
    project: string;
}

export interface Key {
    key: string;
}

export interface ApiKeyInput {
    user: string;
    email: string;
    project: string;
}