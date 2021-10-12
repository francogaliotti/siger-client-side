import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Usuario } from '../models/usuario';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends connectionURL{

  constructor(private http : HttpClient) { 
    super();
    this.endpoint = "";
  }

  public SignIn(nuevoUsuario: NuevoUsuario) : Observable<any> {
    this.endpoint="auth/register"
    return this.http.post<any>(this.app_url + this.endpoint, nuevoUsuario);
  }

  public LogIn(loginUsuario:LoginUsuario) : Observable<JwtDTO> {
    this.endpoint="auth/login"
    return this.http.post<JwtDTO>(this.app_url + this.endpoint, loginUsuario);
  }
  
}
