import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { AlbumInput, PaginatedAlbumes } from './album.models';

@Injectable()
export class AlbumesService {
    constructor(
        @InjectRepository(Album)
        private readonly albumesRepository: Repository<Album>
    ) {}

    async getAlbumes(page: number = 1, limit: number = 20, offset?: number): Promise<PaginatedAlbumes> {
        let skip = (page - 1) * limit;
        if (offset !== undefined) {
            skip = offset;
        }

        const [result, total] = await this.albumesRepository.findAndCount({
            take: limit,
            skip: skip
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data: result,
            limit,
            total,
            page,
            totalPages
        };
    }

    async getAlbum(id: number): Promise<Album> {
        const album = await this.albumesRepository.findOneBy({ id });
        if (!album) {
            throw new HttpException(`Album with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return album;
    }

    async getAlbumesByTitle(title: string): Promise<Album> {
        const album = await this.albumesRepository.findOneBy({ title });
        if (!album) {
            throw new HttpException(`Album ${title} not found`, HttpStatus.NOT_FOUND);
        }
        return album;
    }

    async getAlbumesByArtist(artist: string, page: number = 1, limit: number = 10): Promise<PaginatedAlbumes> {
        const skip = (page - 1) * limit;

        const [result, total] = await this.albumesRepository.findAndCount({
            where: { artist },
            take: limit,
            skip: skip,
        });

        if (result.length === 0) {
            throw new HttpException(`${artist}'s albumes not found`, HttpStatus.NOT_FOUND);
        }

        const totalPages = Math.ceil(total / limit);

        return {
            data: result,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async postAlbum(albumInput: AlbumInput): Promise<Album> {
        const album = this.albumesRepository.create(albumInput);
        return this.albumesRepository.save(album);
    }

    async updateAlbum(id: number, albumInput: AlbumInput): Promise<Album> {
        const album = await this.albumesRepository.findOneBy({ id });
        if (!album) {
            throw new HttpException(`Album with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const requiredFields = ['artist', 'title', 'playcount'];
        for (const field of requiredFields) {
            if (!albumInput[field]) {
                throw new BadRequestException(`Field ${field} is required`);
            }
        }

        Object.assign(album, albumInput);

        return this.albumesRepository.save(album);
    }

    async partialUpdateAlbum(id: number, albumInput: Partial<AlbumInput>): Promise<Album> {
        const album = await this.albumesRepository.findOneBy({ id });
        if (!album) {
            throw new HttpException(`Album with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        Object.assign(album, albumInput);

        return this.albumesRepository.save(album);
    }

    async deleteAlbum(id: number): Promise<Album> {
        const album = await this.albumesRepository.findOneBy({ id });
        if (!album) {
            throw new HttpException(`Album with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return this.albumesRepository.remove(album);
    }
}
