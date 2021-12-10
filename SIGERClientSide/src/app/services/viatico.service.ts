import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Viatico } from '../models/viatico';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class ViaticoService extends connectionURL {

  constructor(private httpClient: HttpClient) {
    super();
   }

   public list(): Observable<Viatico[]>{
    this.endpoint = 'viatico/';
    return this.httpClient.get<Viatico[]>(this.app_url + this.endpoint);
  }

  public detail(id: number): Observable<Viatico>{
    this.endpoint = 'viatico/' + id;
    return this.httpClient.get<Viatico>(this.app_url + this.endpoint);
  }

  /*public detailname(denominacionViatico: string): Observable<Viatico>{
    this.endpoint = 'viatico/detail/' + denominacionViatico;
    return this.httpClient.get<Viatico>(this.app_url + this.endpoint);
  }*/

  public save(viatico: Viatico): Observable<any>{
    this.endpoint = 'viatico/';
    return this.httpClient.post<any>(this.app_url + this.endpoint, viatico);
  }

  public update(id: number, viatico: Viatico): Observable<any>{
    this.endpoint = 'viatico/' + id;
    return this.httpClient.put<any>(this.app_url + this.endpoint, viatico);
  }

  public delete(id?: number): Observable<any>{
    this.endpoint = 'viatico/' + id;
    return this.httpClient.delete<any>(this.app_url + this.endpoint);
  }

}
