import { BaseEntity } from "./base-entity";

export class EstadoLicencia extends BaseEntity{

    codEstadoLicencia: string;
	
	nombreEstadoLicencia: string;

    constructor(codEstadoBoleta: string, nombreEstadoBoleta: string, id?: number){
        super();
        this.id = id;
        this.codEstadoLicencia = codEstadoBoleta;
        this.nombreEstadoLicencia = nombreEstadoBoleta;
    }
    
}