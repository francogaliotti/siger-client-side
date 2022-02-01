import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Remuneracion } from '../models/remuneracion';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class RemuneracionService extends connectionURL {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(): Observable<Remuneracion[]> {
    this.endpoint = 'remuneracion/list';
    return this.httpClient.get<Remuneracion[]>(this.app_url + this.endpoint)
  }

  public page(page: number): Observable<Remuneracion[]> {
    this.endpoint = 'remuneracion/?page=' + page;
    return this.httpClient.get<Remuneracion[]>(this.app_url + this.endpoint)
  }

  public detail(id: number): Observable<Remuneracion> {
    this.endpoint = 'remuneracion/' + id;
    return this.httpClient.get<Remuneracion>(this.app_url + this.endpoint);
  }

  /*public detailname(nombreRemuneracion: string): Observable<Remuneracion>{
    this.endpoint = 'estado-boleta/detail/' + nombreRemuneracion;
    return this.httpClient.get<Remuneracion>(this.app_url + this.endpoint);
  }*/

  public save(remuneracion: Remuneracion): Observable<any> {
    this.endpoint = 'remuneracion/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, remuneracion);
  }

  public update(id: number, remuneracion: Remuneracion): Observable<any> {
    this.endpoint = 'remuneracion/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, remuneracion);
  }

  public delete(id?: number): Observable<any> {
    this.endpoint = 'remuneracion/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

}
