import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(page: number): Observable<Asistencia[]>{
    this.endpoint = 'asistencia/?page='+ page;
    return this.httpClient.get<Asistencia[]>(this.app_url + this.endpoint)
  }

  public listMyAttendance(id: number, page: number): Observable<Asistencia[]>{
    this.endpoint = 'asistencia/?page='+ page+ '&id='+id;
    return this.httpClient.get<Asistencia[]>(this.app_url + this.endpoint)
  }

  public detail(id: number): Observable<Asistencia>{
    this.endpoint = 'asistencia/' + id;
    return this.httpClient.get<Asistencia>(this.app_url + this.endpoint);
  }

  public save(asistencia: Asistencia): Observable<any>{
    this.endpoint = 'asistencia/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, asistencia);
  }

  public update(id: number, asistencia: Asistencia): Observable<any>{
    this.endpoint = 'asistencia/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, asistencia
);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'asistencia/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

}
