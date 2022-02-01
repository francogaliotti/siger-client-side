import { BaseEntity } from "./base-entity";
import { Departamento } from "./departamento";

export class Provincia extends BaseEntity{

    categoria: string;

    latitud: string;

    longitud: string;

    fuente:string;

    iso_id: string;

    iso_nombre: string;

    nombre: string;

    nombre_completo: string;

    constructor(){
        super();

    }

}