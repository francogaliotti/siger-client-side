import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteLicenciaGuardService {

  realRol: String;

  constructor(
    private _tokenService: TokenService,
    private router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data.expectedRol;
    this.realRol = this._tokenService.IsAdmin() ? 'admin' : 'user';
    if(!this._tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
