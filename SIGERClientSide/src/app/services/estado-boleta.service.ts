import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoBoleta } from '../models/estado-boleta';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})

export class EstadoBoletaService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(page: number): Observable<EstadoBoleta[]>{
    this.endpoint = 'estado-boleta/?page='+ page;
    console.log(this.endpoint);
    return this.httpClient.get<EstadoBoleta[]>(this.app_url + this.endpoint)
  }

  /*private transform( resp: FetchAllEstadoBoletaResponse): Estado_Boleta[]{
    
    const estado_boleta_list: Estado_Boleta[] = resp.results.map( estado_boleta =>{

      return {

        id: estado_boleta.id,
        codEstadoBoleta: estado_boleta.codEstadoBoleta,
        nombreEstadoBoleta: estado_boleta.nombreEstadoBoleta,
      }
    })
    return estado_boleta_list;

  }*/

  public detail(id: number): Observable<EstadoBoleta>{
    this.endpoint = 'estado-boleta/' + id;
    return this.httpClient.get<EstadoBoleta>(this.app_url + this.endpoint);
  }

  /*public detailname(nombreEstadoBoleta: string): Observable<EstadoBoleta>{
    this.endpoint = 'estado-boleta/detail/' + nombreEstadoBoleta;
    return this.httpClient.get<EstadoBoleta>(this.app_url + this.endpoint);
  }*/

  public save(estadoBoleta: EstadoBoleta): Observable<any>{
    this.endpoint = 'estado-boleta/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, estadoBoleta);
  }

  public update(id: number, estadoBoleta: EstadoBoleta): Observable<any>{
    this.endpoint = 'estado-boleta/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, estadoBoleta);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'estado-boleta/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }
}
