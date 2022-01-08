import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegimenHorario } from '../models/regimen-horario';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class RegimenHorarioService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(page: number): Observable<RegimenHorario[]>{
    this.endpoint = 'regimen-horario/?page='+ page;
    return this.httpClient.get<RegimenHorario[]>(this.app_url + this.endpoint)
  }

  public detail(id: number): Observable<RegimenHorario>{
    this.endpoint = 'regimen-horario/' + id;
    return this.httpClient.get<RegimenHorario>(this.app_url + this.endpoint);
  }

  public save(regimenHorario: RegimenHorario): Observable<any>{
    this.endpoint = 'regimen-horario/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, regimenHorario);
  }

  public update(id: number, regimenHorario: RegimenHorario): Observable<any>{
    this.endpoint = 'regimen-horario/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, regimenHorario);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'regimen-horario/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

}
