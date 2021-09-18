import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permiso } from '../models/permiso';
import { connectionURL } from './connectionURL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }
  public list(): Observable<Permiso[]>{
    this.endpoint = 'permiso/list';
    return this.httpClient.get<Permiso[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<Permiso>{
    this.endpoint = 'permiso/detail/' + id;
    return this.httpClient.get<Permiso>(this.app_url + this.endpoint);
  }

  public detailname(nombrePermiso: string): Observable<Permiso>{
    this.endpoint = 'permiso/detail/' + nombrePermiso;
    return this.httpClient.get<Permiso>(this.app_url + this.endpoint);
  }

  public save(permiso: Permiso): Observable<any>{
    this.endpoint = 'permiso/create';
    return this.httpClient.post<any>(this.app_url + this.endpoint, permiso);
  }

  public update(id: number, permiso: Permiso): Observable<any>{
    this.endpoint = 'permiso/update/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, permiso);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'permiso/delete/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }
}
