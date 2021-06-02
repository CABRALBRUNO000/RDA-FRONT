import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './../login/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token && !this.authService.isTokenExpired(token)) {
      // o request é imutável, ou seja, não é possivel mudar nada
      // Faço o cline para conseguir mudar as propriedades
      // passo o token de autencicação no header

      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    // retorno do request com erro tratado
    return next.handle(request).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro do cliete-sede ou da rede
      console.error(
        `Código do erro :: ${error.status}, ` +
          `Erro: ${JSON.stringify(error.error)}`
      );
    }
    // retornar um observable com uma mensagem amigável
    return throwError(`Usuário ou senha incorretos, tente novamente`);
  }
}
