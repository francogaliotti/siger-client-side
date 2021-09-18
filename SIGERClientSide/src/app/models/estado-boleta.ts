import { BaseEntity } from "./base-entity";

export class EstadoBoleta extends BaseEntity{

    codEstadoBoleta: string;
	
	nombreEstadoBoleta: string;
    
    constructor(codEstadoBoleta: string, nombreEstadoBoleta: string, id?: number){
        super();
        this.id = id;
        this.codEstadoBoleta = codEstadoBoleta;
        this.nombreEstadoBoleta = nombreEstadoBoleta;
    }

}