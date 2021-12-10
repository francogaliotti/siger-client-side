import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from '../models/sector';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class SectorService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(): Observable<Sector[]>{
    this.endpoint = 'sector/';
    return this.httpClient.get<Sector[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<Sector>{
    this.endpoint = 'sector/' + id;
    return this.httpClient.get<Sector>(this.app_url + this.endpoint);
  }

  /*public detailname(denominacion: string): Observable<Sector>{
    this.endpoint = 'sector/detail/' + denominacion;
    return this.httpClient.get<Sector>(this.app_url + this.endpoint);
  }*/

  public save(sector: Sector): Observable<any>{
    this.endpoint = 'sector/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, sector);
  }

  public update(id: number, sector: Sector): Observable<any>{
    this.endpoint = 'sector/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, sector);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'sector/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }
}
