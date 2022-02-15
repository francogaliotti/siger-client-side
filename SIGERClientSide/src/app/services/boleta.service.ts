import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boleta } from '../models/boleta';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class BoletaService extends connectionURL{

  constructor(private httpClient: HttpClient) { 
    super();
  }

  public list(page: number): Observable<Boleta[]>{
    this.endpoint = 'boleta/?page='+ page;
    return this.httpClient.get<Boleta[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<Boleta>{
    this.endpoint = 'boleta/' + id;
    return this.httpClient.get<Boleta>(this.app_url + this.endpoint);
  }


  public save(boleta: Boleta): Observable<any>{
    this.endpoint = 'boleta/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, boleta);
  }

  public update(id: number, boleta: Boleta): Observable<any>{
    this.endpoint = 'boleta/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, boleta);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'boleta/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

  public authorize(id?: number): Observable<any>{
    this.endpoint = 'boleta/authorize/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, null);
  }

  public reject(id: number, boleta: Boleta): Observable<any>{
    this.endpoint = 'boleta/reject/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, boleta);
  }
}