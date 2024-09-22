import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistInput, PaginatedArtists } from './artist.models';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist)
        private readonly artistsRepository: Repository<Artist>,
    ) {}

    async getArtists(page: number = 1, limit: number = 20): Promise<PaginatedArtists> {
        const [result, total] = await this.artistsRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data: result,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async getArtist(id: number): Promise<Artist> {
        const artist = this.artistsRepository.findOneBy({ id });
        if (!artist) {
            throw new NotFoundException(`Artist with id ${id} not found`);
        }
        return artist
    }

    async getArtistByName(name: string): Promise<Artist> {
        const artist = await this.artistsRepository.findOneBy({ name });
        if (!artist) {
            throw new NotFoundException(`Artist with name ${name} not found`);
        }
        return artist;
    }

    async postArtist(artistInput: ArtistInput): Promise<Artist> {
        const artist = this.artistsRepository.create(artistInput);
        return this.artistsRepository.save(artist);
    }

    async updateArtist(id: number, artistInput: ArtistInput): Promise<Artist> {
        const artist = await this.artistsRepository.findOneBy({ id });
        if (!artist) {
            throw new NotFoundException(`Artist with ID ${id} not found`);
        }

        const requiredFields = ['name', 'listeners', 'playcount'];
        for (const field of requiredFields) {
            if (!artistInput[field]) {
                throw new BadRequestException(`Field ${field} is required`);
            }
        }

        Object.assign(artist, artistInput);

        return this.artistsRepository.save(artist);
    }

    async partialUpdateArtist(id: number, artistInput: Partial<ArtistInput>): Promise<Artist> {
        const artist = await this.artistsRepository.findOneBy({ id });
        if (!artist) {
            throw new NotFoundException(`Artist with ID ${id} not found`);
        }

        Object.assign(artist, artistInput);

        return this.artistsRepository.save(artist);
    }

    async deleteArtist(id: number): Promise<Artist> {
        const artist = await this.artistsRepository.findOneBy({ id });
        if (!artist) {
            throw new NotFoundException(`Artist with ID ${id} not found`);
        }
        return this.artistsRepository.remove(artist);
    }
}
