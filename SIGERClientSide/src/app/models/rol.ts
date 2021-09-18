import { BaseEntity } from "./base-entity";
import { Permiso } from "./permiso";

export class Rol extends BaseEntity{

    codigoRol: string;
	
	nombreRol: string;

    //Relation

    permisos: Permiso[];

    constructor(codigoRol:string, nombreRol:string, permisos:Permiso[], id?:number){
        super();
        this.id=id;
        this.codigoRol=codigoRol;
        this.nombreRol=nombreRol;
        this.permisos=permisos;
    }

}