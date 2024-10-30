import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './api_key.entity';
import { ApiKeysService } from './api_keys.service';
import { ApiKeysController } from './api_keys.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ApiKey]),
    ],
    providers: [ApiKeysService],
    controllers: [ApiKeysController],
})
export class ApiKeysModule {}
