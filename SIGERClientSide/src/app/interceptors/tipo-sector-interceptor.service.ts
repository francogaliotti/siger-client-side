import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { JwtDTO } from '../dto/jwt-dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class TipoSectorInterceptorService implements HttpInterceptor{

  constructor(
    private _tokenService: TokenService,
    private _authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this._tokenService.isLogged()) {
      return next.handle(req);
    }

    let intReq = req;
    const token = this._tokenService.getToken();

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const dto: JwtDTO = new JwtDTO(this._tokenService.getToken());
        return this._authService.refresh(dto).pipe(concatMap((data: any) => {
          console.log('refreshing....');
          this._tokenService.setToken(data.token);
          intReq = this.addToken(req, data.token);
          return next.handle(intReq);
        }));
      } else {
        this._tokenService.logOut();
        return throwError(err);
      }
    }));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: TipoSectorInterceptorService, multi: true }];

