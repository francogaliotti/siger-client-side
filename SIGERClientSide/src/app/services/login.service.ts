import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends connectionURL{

  constructor(private http : HttpClient) { 
    super();
    this.endpoint = "";
  }

  SignIn() : Observable<any> {
    return this.http.get(this.app_url + this.endpoint);
  }
}
