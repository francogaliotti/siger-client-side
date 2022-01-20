import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento';
import { Localidad } from '../models/localidad';
import { Municipio } from '../models/municipio';
import { Provincia } from '../models/provincia';
import { connectionURL } from './connectionURL';

@Injectable({
  providedIn: 'root'
})
export class DatosGobArService extends connectionURL{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getAllProvincias(page: number): Observable<Provincia[]>{
    this.endpoint = 'datos-gob-ar/provincias/?page='+ page;
    return this.httpClient.get<Provincia[]>(this.app_url + this.endpoint)
  }

  public getAllDepartamentos(page: number): Observable<Departamento[]>{
    this.endpoint = 'datos-gob-ar/departamentos/?page='+ page;
    return this.httpClient.get<Departamento[]>(this.app_url + this.endpoint)
  }

  public getAllMunicipios(page: number): Observable<Municipio[]>{
    this.endpoint = 'datos-gob-ar/provincias/?page='+ page;
    return this.httpClient.get<Municipio[]>(this.app_url + this.endpoint)
  }

  public getAllLocalidades(page: number): Observable<Localidad[]>{
    this.endpoint = 'datos-gob-ar/departamentos/?page='+ page;
    return this.httpClient.get<Localidad[]>(this.app_url + this.endpoint)
  }


}
