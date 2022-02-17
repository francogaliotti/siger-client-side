import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movilidad } from '../models/movilidad';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})

export class MovilidadService extends connectionURL{

  constructor(private httpClient: HttpClient) { 
    super();
  }

  public list(page: number): Observable<Movilidad[]>{
    this.endpoint = 'movilidad/?page='+ page;
    return this.httpClient.get<Movilidad[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<Movilidad>{
    this.endpoint = 'movilidad/' + id;
    return this.httpClient.get<Movilidad>(this.app_url + this.endpoint);
  }


  public save(movilidad: Movilidad): Observable<any>{
    this.endpoint = 'movilidad/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, movilidad);
  }

  public update(id: number, movilidad: Movilidad): Observable<any>{
    this.endpoint = 'movilidad/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, movilidad);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'movilidad/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

  public alreadyExistPatente(patente: string): Observable<boolean>
  {
    this.endpoint = 'movilidad/alreadyExistPatente/' + patente;
    return this.httpClient.get<boolean>(this.app_url + this.endpoint);
  }
}