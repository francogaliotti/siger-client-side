import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoSector } from '../models/tipo-sector';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class TipoSectorService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(page: number): Observable<TipoSector[]>{
    this.endpoint = 'tipo-sector/?page='+ page;
    return this.httpClient.get<TipoSector[]>(this.app_url + this.endpoint)
  }

  public detail(id: number): Observable<TipoSector>{
    this.endpoint = 'tipo-sector/' + id;
    return this.httpClient.get<TipoSector>(this.app_url + this.endpoint);
  }

  /*public detailname(nombreTipoSector: string): Observable<TipoSector>{
    this.endpoint = 'tipo-sector/detail/' + nombreTipoSector;
    return this.httpClient.get<TipoSector>(this.app_url + this.endpoint);
  }*/

  public save(tipoSector: TipoSector): Observable<any>{
    this.endpoint = 'tipo-sector/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, tipoSector);
  }

  public update(id: number, tipoSector: TipoSector): Observable<any>{
    this.endpoint = 'tipo-sector/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, tipoSector);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'tipo-sector/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }
}
