import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(page: number): Observable<Empleado[]>{
    this.endpoint = 'empleado/?page='+ page;
    return this.httpClient.get<Empleado[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<Empleado>{
    this.endpoint = 'empleado/' + id;
    return this.httpClient.get<Empleado>(this.app_url + this.endpoint);
  }

  public getByUsuarioId(id: number): Observable<Empleado>{
    this.endpoint = 'empleado/e/' + id;
    return this.httpClient.get<Empleado>(this.app_url + this.endpoint);
  }

  public getByUserName(username: string): Observable<Empleado>{
    this.endpoint = 'empleado/employee/' + username;
    return this.httpClient.get<Empleado>(this.app_url + this.endpoint);
  }

  /*public detailname(nombre: string): Observable<Empleado>{
    this.endpoint = 'empleado/detail/' + nombre;
    return this.httpClient.get<Empleado>(this.app_url + this.endpoint);
  }*/

  public save(empleado: Empleado): Observable<any>{
    this.endpoint = 'empleado/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, empleado);
  }

  public update(id: number, empleado: Empleado): Observable<any>{
    this.endpoint = 'empleado/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, empleado);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'empleado/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }
}
