import { ApiKeyInput } from './api_key.models';
import { ApiKeysService } from './api_keys.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('api_key')
export class ApiKeysController {

    constructor(private apiKeysService: ApiKeysService) {}

    @Post()
    async createApiKey(@Body() apiKeyIput: ApiKeyInput) {
        return this.apiKeysService.createApiKey(apiKeyIput);
    }
}
