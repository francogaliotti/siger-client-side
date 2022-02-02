import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../dto/jwt-dto';
import { LoginUsuario } from '../dto/login-usuario';
import { NuevoUsuario } from '../dto/nuevo-usuario';
import { Usuario } from '../models/usuario';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends connectionURL{

  constructor(private httpClient : HttpClient) { 
    super();
    this.endpoint = "";
  }

  public SignIn(nuevoUsuario: NuevoUsuario) : Observable<any> {
    this.endpoint="auth/register"
    return this.httpClient.post<any>(this.app_url + this.endpoint, nuevoUsuario);
  }

  public LogIn(loginUsuario:LoginUsuario) : Observable<JwtDTO> {
    this.endpoint="auth/login"
    return this.httpClient.post<JwtDTO>(this.app_url + this.endpoint, loginUsuario);
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    this.endpoint="auth/refresh"
    return this.httpClient.post<JwtDTO>(this.app_url + this.endpoint, dto);
  }

  public isFirstSignIn(id : string): Observable<boolean>{
    this.endpoint = "auth/" + id;
    return this.httpClient.get<boolean>(this.app_url + this.endpoint);
  }

  public getByUserId(id: number): Observable<Usuario>{
    this.endpoint = "auth/getUser/" + id;
    return this.httpClient.get<Usuario>(this.app_url + this.endpoint);
  }
  
}
