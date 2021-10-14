import { BaseEntity } from "./base-entity";

export class ZonaInhospita extends BaseEntity{

    codZona: string;

	denominacionZona: string;
	
	precio: number;

	constructor(codZona: string, denominacionZona: string, precio:number ,id?: number){
        super();
        this.id = id;
        this.codZona = codZona;
        this.denominacionZona = denominacionZona;
		this.precio = precio;
    }

}