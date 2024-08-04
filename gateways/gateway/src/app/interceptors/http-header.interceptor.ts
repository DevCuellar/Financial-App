import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { tap } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements NestInterceptor {
  private readonly gatewayToken = process.env.GATEWAY_TOKEN;

  constructor(private readonly httpService: HttpService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap(() => {
        this.httpService.axiosRef.defaults.headers.common['x-gateway-token'] = this.gatewayToken;
      })
    );
  }
}
