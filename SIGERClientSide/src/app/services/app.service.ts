import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class AppService extends connectionURL {

  authenticated = false;

  constructor(private http: HttpClient) {
    super();
  }

  authenticate(user: Usuario, callback: any) {

    this.endpoint = "Usuario/Signin"

    const headers = new HttpHeaders(user ? {
      authorization: 'Basic ' + btoa(user.username + ':' + user.password)
    } : {});

    this.http.get<Usuario>(this.app_url + this.endpoint, { headers: headers }).subscribe(response => {
      if (response['username'] == user.username) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

}