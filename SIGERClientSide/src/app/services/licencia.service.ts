import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Licencia } from '../models/licencia';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService extends connectionURL{

  constructor(private httpClient: HttpClient) { 
    super();
  }

  public list(page: number): Observable<Licencia[]>{
    this.endpoint = 'licencia/?page='+ page;
    return this.httpClient.get<Licencia[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<Licencia>{
    this.endpoint = 'licencia/' + id;
    return this.httpClient.get<Licencia>(this.app_url + this.endpoint);
  }

  /*public detailname(nombreEstadoLicencia: string): Observable<EstadoLicencia>{
    this.endpoint = 'estadoLicencia/detail/' + nombreEstadoLicencia;
    return this.httpClient.get<EstadoLicencia>(this.app_url + this.endpoint);
  }*/

  public save(licencia: Licencia): Observable<any>{
    this.endpoint = 'licencia/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, licencia);
  }

  public update(id: number, licencia: Licencia): Observable<any>{
    this.endpoint = 'licencia/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, licencia);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'licencia/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

  public authorize(id?: number): Observable<any>{
    this.endpoint = 'licencia/authorize/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, null);
  }

  public reject(id?: number): Observable<any>{
    this.endpoint = 'licencia/reject/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, null);
  }
}
