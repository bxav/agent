import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized: Invalid API key',
      });
    }

    next();
  }
}
