import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('api_key')
export class ApiKey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 512 })
    user: string;

    @Column({ length: 512 })
    email: string;

    @Column({ length: 1024 })
    project: string;

    @Column({ length: 512 })
    api_key: string;
}