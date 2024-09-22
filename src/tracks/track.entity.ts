import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 512 })
    artist: string;

    @Column({ length: 512 })
    album: string;

    @Column({ length: 512 })
    title: string;
}
