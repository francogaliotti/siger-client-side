import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ZonaInhospita } from '../models/zona-inhospita';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class ZonaInhospitaService extends connectionURL{
  constructor(private httpClient: HttpClient) { 
    super();
  }

  public list(): Observable<ZonaInhospita[]>{
    this.endpoint = 'zonaInhospita/list';
    return this.httpClient.get<ZonaInhospita[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<ZonaInhospita>{
    this.endpoint = 'zonaInhospita/detail/' + id;
    return this.httpClient.get<ZonaInhospita>(this.app_url + this.endpoint);
  }

  public save(zonaInhospita: ZonaInhospita): Observable<any>{
    this.endpoint = 'zonaInhospita/create';
    return this.httpClient.post<any>(this.app_url + this.endpoint, zonaInhospita);
  }

  public update(id: number, zonaInhospita: ZonaInhospita): Observable<any>{
    this.endpoint = 'zonaInhospita/update/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, zonaInhospita);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'zonaInhospita/delete/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }
}
