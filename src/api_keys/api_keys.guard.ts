import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ApiKeysService } from './api_keys.service';
import { Request } from 'express';

@Injectable()
export class ApiKeysGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeysService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = Array.isArray(request.headers['x-api-key']) ? request.headers['x-api-key'][0] : request.headers['x-api-key'];

    if (!apiKey) {
      throw new ForbiddenException('API key is missing');
    }

    const isValidApiKey = await this.apiKeyService.validateApiKey(apiKey);
    if (!isValidApiKey) {
      throw new ForbiddenException('Invalid API key');
    }

    return true;
  }
}
