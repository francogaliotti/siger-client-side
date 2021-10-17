import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ViaticoInterceptorService implements HttpInterceptor{

  constructor(private _tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const TOKEN = this._tokenService.getToken();
    if(TOKEN != null){
      intReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+ TOKEN)});
    }
    return next.handle(intReq);
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ViaticoInterceptorService, multi: true}];
