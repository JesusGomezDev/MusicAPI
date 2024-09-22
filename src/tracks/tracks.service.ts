import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { TrackInput } from './track.models';

export interface TrackInterface {
    id: number;
    title: string;
    artist: string;
    album: string;
}

export interface PaginatedTracks {
    data: Track[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Injectable()
export class TracksService {
    constructor(
        @InjectRepository(Track)
        private readonly tracksRepository: Repository<Track>,
    ) {}

    async getTracks(page: number = 1, limit: number = 20): Promise<PaginatedTracks> {
        const [result, total] = await this.tracksRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data: result,
            limit,
            total,
            page,
            totalPages,
        };
    }

    async getTrack(id: number): Promise<Track> {
        return this.tracksRepository.findOneBy({ id });
    }

    async postTrack(trackInput: TrackInput): Promise<Track> {
        const track = this.tracksRepository.create(trackInput);
        return this.tracksRepository.save(track);
    }
}