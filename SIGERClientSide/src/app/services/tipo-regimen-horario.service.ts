import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoRegimenHorario } from '../models/tipo-regimen-horario';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class TipoRegimenHorarioService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(page: number): Observable<TipoRegimenHorario[]>{
    this.endpoint = 'tipo-regimen-horario/?page='+ page;
    return this.httpClient.get<TipoRegimenHorario[]>(this.app_url + this.endpoint)
  }

  public detail(id: number): Observable<TipoRegimenHorario>{
    this.endpoint = 'tipo-regimen-horario/' + id;
    return this.httpClient.get<TipoRegimenHorario>(this.app_url + this.endpoint);
  }

  public save(tipoRegimenHorario: TipoRegimenHorario): Observable<any>{
    this.endpoint = 'tipo-regimen-horario/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, tipoRegimenHorario);
  }

  public update(id: number, tipoRegimenHorario: TipoRegimenHorario): Observable<any>{
    this.endpoint = 'tipo-regimen-horario/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, tipoRegimenHorario);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'tipo-regimen-horario/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

}
