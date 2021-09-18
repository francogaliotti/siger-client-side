import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoBoleta } from '../models/estado-boleta';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})

export class EstadoBoletasService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(): Observable<EstadoBoleta[]>{
    this.endpoint = 'estadoBoleta/list';
    return this.httpClient.get<EstadoBoleta[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<EstadoBoleta>{
    this.endpoint = 'estadoBoleta/detail/' + id;
    return this.httpClient.get<EstadoBoleta>(this.app_url + this.endpoint);
  }

  public detailname(nombreEstadoBoleta: string): Observable<EstadoBoleta>{
    this.endpoint = 'estadoBoleta/detail/' + nombreEstadoBoleta;
    return this.httpClient.get<EstadoBoleta>(this.app_url + this.endpoint);
  }

  public save(estadoBoleta: EstadoBoleta): Observable<any>{
    this.endpoint = 'estadoBoleta/create';
    return this.httpClient.post<any>(this.app_url + this.endpoint, estadoBoleta);
  }

  public update(id: number, estadoBoleta: EstadoBoleta): Observable<any>{
    this.endpoint = 'estadoBoleta/update/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, estadoBoleta);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'estadoBoleta/delete/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }
}
