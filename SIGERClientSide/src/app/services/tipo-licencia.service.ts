import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoLicenciaDTO } from '../dto/tipoLicenciaDTO';
import { TipoLicencia } from '../models/tipo-licencia';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class TipoLicenciaService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
   }

   public list(): Observable<TipoLicenciaDTO[]>{
    this.endpoint = 'tipoLicencia/list';
    return this.httpClient.get<TipoLicenciaDTO[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<TipoLicenciaDTO>{
    this.endpoint = 'tipoLicencia/detail/' + id;
    return this.httpClient.get<TipoLicenciaDTO>(this.app_url + this.endpoint);
  }

  /*public detailname(nombreEstadoLicencia: string): Observable<EstadoLicencia>{
    this.endpoint = 'estadoLicencia/detail/' + nombreEstadoLicencia;
    return this.httpClient.get<EstadoLicencia>(this.app_url + this.endpoint);
  }*/

  public save(tipoLicencia: TipoLicenciaDTO): Observable<any>{
    this.endpoint = 'tipoLicencia/create';
    return this.httpClient.post<any>(this.app_url + this.endpoint, tipoLicencia);
  }

  public update(id: number, estadoLicencia: TipoLicenciaDTO): Observable<any>{
    this.endpoint = 'tipoLicencia/update/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, estadoLicencia);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'tipoLicencia/delete/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

}
