import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, of } from "rxjs";

interface errorResponse {
    message: string;
    detail: string;
}

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next
        .handle()
        .pipe(
          catchError(err => {
            return of({
              message: err.response.error,
              detail: err.response.message[0]
            } as errorResponse)
          } ),
        );
    }
}
