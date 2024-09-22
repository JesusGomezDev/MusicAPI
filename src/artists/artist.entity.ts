import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 512 })
    name: string;

    @Column({ type: 'int', nullable: true })
    listeners: number;

    @Column({ type: 'bigint', nullable: true })
    playcount: number;
}
