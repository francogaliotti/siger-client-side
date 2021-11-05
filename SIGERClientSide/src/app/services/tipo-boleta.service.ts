import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoBoletaDTO } from '../dto/tipo-boleta-dto';
import { TipoBoleta } from '../models/tipo-boleta';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class TipoBoletaService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(): Observable<TipoBoletaDTO[]>{
    this.endpoint = 'tipoBoleta/list';
    return this.httpClient.get<TipoBoletaDTO[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<TipoBoletaDTO>{
    this.endpoint = 'tipoBoleta/detail/' + id;
    return this.httpClient.get<TipoBoletaDTO>(this.app_url + this.endpoint);
  }

  /*public detailname(tipoBoletaDenominacion: string): Observable<TipoBoletaDTO>{
    this.endpoint = 'tipoBoleta/detail/' + tipoBoletaDenominacion;
    return this.httpClient.get<TipoBoletaDTO>(this.app_url + this.endpoint);
  }*/

  public save(tipoBoleta: TipoBoletaDTO): Observable<any>{
    this.endpoint = 'tipoBoleta/create';
    return this.httpClient.post<any>(this.app_url + this.endpoint, tipoBoleta);
  }

  public update(id: number, tipoBoleta: TipoBoletaDTO): Observable<any>{
    this.endpoint = 'tipoBoleta/update/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, tipoBoleta);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'tipoBoleta/delete/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

}
