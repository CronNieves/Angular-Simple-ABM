import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
          tap((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                  // Si queremos hacer algo con la respuesta, éste es el sitio.
                  console.log(event);
                  console.log('Interceptor-Response: ', event);
              }
          }, (err: any) => {
              if (err instanceof HttpErrorResponse) {
                  switch (err.status) {
                      case 404:
                          console.log('Interceptor-Response: Página no encontrada!');
                          break;
                      default:
                          console.log('Interceptor-Response: Error respuesta (' + err.status + '): ' + err.statusText);
                          break;
                  }
              }
          })
      );
  }
}