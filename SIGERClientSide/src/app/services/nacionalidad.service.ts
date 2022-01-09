import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nacionalidad } from '../models/nacionalidad';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService extends connectionURL{

  constructor(private _httpClient: HttpClient) 
  { 
    super();
  }

  public GetAll(): Observable<Nacionalidad[]>{
    this.endpoint = 'nationality/';
    return this._httpClient.get<Nacionalidad[]>(this.app_url + this.endpoint);
  }

}
