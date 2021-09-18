import { BaseEntity } from "./base-entity";

export class Permiso extends BaseEntity{

    codigoPermiso: string;
	
	nombrePermiso: string;

    constructor(codigoPermiso:string, nombrePermiso:string, id?:number){
        super();
        this.codigoPermiso=codigoPermiso;
        this.nombrePermiso=nombrePermiso;
        this.id=id;
    }
    
}