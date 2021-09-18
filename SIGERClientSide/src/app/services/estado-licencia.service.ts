import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoLicencia } from '../models/estado-licencia';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})

export class EstadoLicenciaService extends connectionURL{

  constructor(private httpClient: HttpClient) { 
    super();
  }

  public list(): Observable<EstadoLicencia[]>{
    this.endpoint = 'estadoLicencia/list';
    return this.httpClient.get<EstadoLicencia[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<EstadoLicencia>{
    this.endpoint = 'estadoLicencia/detail/' + id;
    return this.httpClient.get<EstadoLicencia>(this.app_url + this.endpoint);
  }

  /*public detailname(nombreEstadoLicencia: string): Observable<EstadoLicencia>{
    this.endpoint = 'estadoLicencia/detail/' + nombreEstadoLicencia;
    return this.httpClient.get<EstadoLicencia>(this.app_url + this.endpoint);
  }*/

  public save(estadoLicencia: EstadoLicencia): Observable<any>{
    this.endpoint = 'estadoLicencia/create';
    return this.httpClient.post<any>(this.app_url + this.endpoint, estadoLicencia);
  }

  public update(id: number, estadoLicencia: EstadoLicencia): Observable<any>{
    this.endpoint = 'estadoLicencia/update/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, estadoLicencia);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'estadoLicencia/delete/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

}
