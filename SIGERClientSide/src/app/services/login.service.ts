import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends connectionURL{

  constructor(private http : HttpClient) { 
    super();
    this.endpoint = "Usuario/"
  }

  SignIn(user: Usuario) : Observable<any> {
    this.endpoint = this.endpoint + "Signin";
    return this.http.post<any>(this.app_url + this.endpoint, user);
  }
}
