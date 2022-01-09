import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoMovilidad } from '../models/tipo-movilidad';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})

export class TipoMovilidadService extends connectionURL{

  constructor(private httpClient: HttpClient) { 
    super();
  }

  public list(page: number): Observable<TipoMovilidad[]>{
    this.endpoint = 'tipo-movilidad/?page='+ page;
    return this.httpClient.get<TipoMovilidad[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<TipoMovilidad>{
    this.endpoint = 'tipo-movilidad/' + id;
    return this.httpClient.get<TipoMovilidad>(this.app_url + this.endpoint);
  }


  public save(tipoMovilidad: TipoMovilidad): Observable<any>{
    this.endpoint = 'tipo-movilidad/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, tipoMovilidad);
  }

  public update(id: number, tipoMovilidad: TipoMovilidad): Observable<any>{
    this.endpoint = 'tipo-movilidad/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, tipoMovilidad);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'tipo-movilidad/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

}