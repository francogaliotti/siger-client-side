import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { connectionURL } from './connectionURL';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})

export class TokenService{

  roles: Array<string> = [];

  constructor(private router: Router) {}

  public setToken(token: string): void{ 
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY)?.toString()!;
    return token;
  }

  public isLogged(): boolean{
    if(this.getToken()){
      return true;
    }
    return false;
  }

  public getUserId(): number {
    if (!this.isLogged()) {
      return 0;
    }
    const token = this.getToken();
    const payload = token.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const id = values.jti;
    return id;
  }

  public getUsername(): string {
    if (!this.isLogged()) {
      return '';
    }
    const token = this.getToken();
    const payload = token.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;
    return username;
  }

  public IsAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public logOut(): void{
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}