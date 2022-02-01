import { BaseEntity } from "./base-entity";
import { Departamento } from "./departamento";

export class Localidad extends BaseEntity{

    categoria: string;

    latitud: string;

    longitud: string;

    fuente:string;

    departamento: string;

    departamento_nombre: string;

    localidadCensalId: string;

    localidadCensalNombre: string;

    municipio: string;

    municipio_nombre: string;

    nombre: string;

    provincia: string;

    provincia_nombre: string;

    constructor(){
        super();
    }

}