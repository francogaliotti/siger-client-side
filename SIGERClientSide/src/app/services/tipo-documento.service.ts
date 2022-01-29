import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../models/tipo-documento';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
   }

   public list(): Observable<TipoDocumento[]>{
    this.endpoint = 'tipo-documento/';
    return this.httpClient.get<TipoDocumento[]>(this.app_url + this.endpoint);
  }
}
