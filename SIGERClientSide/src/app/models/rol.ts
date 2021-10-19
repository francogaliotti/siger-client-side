import { BaseEntity } from "./base-entity";
import { Permiso } from "./permiso";

export class Rol extends BaseEntity{

    codigoRol: string;
	
	nombreRol: string;

    permisos: Permiso[];

    constructor(){
        super();
    }


}