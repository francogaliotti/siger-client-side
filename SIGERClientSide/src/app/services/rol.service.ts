import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class RolService extends connectionURL {

  
  constructor(private httpClient: HttpClient) {
    super();
  }
  public list(): Observable<Rol[]>{
    this.endpoint = 'rol/list';
    return this.httpClient.get<Rol[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<Rol>{
    this.endpoint = 'rol/detail/' + id;
    return this.httpClient.get<Rol>(this.app_url + this.endpoint);
  }

  public detailname(nombreRol: string): Observable<Rol>{
    this.endpoint = 'rol/detail/' + nombreRol;
    return this.httpClient.get<Rol>(this.app_url + this.endpoint);
  }

  public save(rol: Rol): Observable<any>{
    this.endpoint = 'rol/create';
    return this.httpClient.post<any>(this.app_url + this.endpoint, rol);
  }

  public update(id: number, rol: Rol): Observable<any>{
    this.endpoint = 'rol/update/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, rol);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'rol/delete/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }
}
