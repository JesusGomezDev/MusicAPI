import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApiKey } from './api_key.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKeyInput, Key } from './api_key.models';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApiKeysService {
    constructor(
        @InjectRepository(ApiKey)
        private readonly apiKeysRepository: Repository<ApiKey>,
    ) {}

    async validateApiKey(apiKey: string): Promise<boolean> {
        const foundApiKey = await this.apiKeysRepository.findOneBy({ api_key: apiKey })
        return !!foundApiKey
    }

    async createApiKey(apiKeyInput: ApiKeyInput): Promise <string> {
        const apiKey = await this.apiKeysRepository.findOneBy({ email: apiKeyInput.email })
        if (!apiKey) {
            const newKey = this.apiKeysRepository.create({
                ...apiKeyInput,
                api_key: uuidv4()
            });
            await this.apiKeysRepository.save(newKey)
            return newKey.api_key
        }
        return apiKey.api_key
    }
}
