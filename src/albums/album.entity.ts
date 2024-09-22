import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 512 })
    artist: string;

    @Column({ length: 512 })
    title: string;

    @Column({ type: 'bigint', nullable: true })
    playcount: number;
}
