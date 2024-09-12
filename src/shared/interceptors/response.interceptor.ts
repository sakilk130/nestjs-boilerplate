import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = {
          success: true,
          data: data?.data,
        };
        if (data.status && data.message) {
          response['status'] = data.status;
          response['message'] = data.message;
        } else {
          response['status'] = 200;
          response['message'] = 'Success';
        }
        return response;
      }),
    );
  }
}
