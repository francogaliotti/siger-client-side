import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincia } from '../models/provincia';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }
  public list(): Observable<Provincia[]>{
    this.endpoint = 'provincia/';
    return this.httpClient.get<Provincia[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<Provincia>{
    this.endpoint = 'provincia/' + id;
    return this.httpClient.get<Provincia>(this.app_url + this.endpoint);
  }

  /*public detailname(denom: string): Observable<Provincia>{
    this.endpoint = 'provincia/detail/' + denom;
    return this.httpClient.get<Provincia>(this.app_url + this.endpoint);
  }*/

  public save(permiso: Provincia): Observable<any>{
    this.endpoint = 'provincia/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, permiso);
  }

  public update(id: number, permiso: Provincia): Observable<any>{
    this.endpoint = 'provincia/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, permiso);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'provincia/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }}
