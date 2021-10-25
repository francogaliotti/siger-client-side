import { BaseEntity } from "./base-entity";

export class Permiso extends BaseEntity{

    codigoPermiso: string;
	
	nombrePermiso: string;

    constructor(){
        super();
    }
    
}