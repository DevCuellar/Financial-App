import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GatewayAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const gatewayToken = req.headers['x-gateway-token'];
    const expectedToken = process.env.GATEWAY_TOKEN;

    if (expectedToken && gatewayToken === expectedToken) {
      next();
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
