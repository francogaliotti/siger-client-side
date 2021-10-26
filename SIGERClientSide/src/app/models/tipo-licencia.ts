import { BaseEntity } from "./base-entity";
import { TipoRequerimiento } from "./tipo-requerimiento";

export class TipoLicencia extends BaseEntity{

    fechaAlta: Date;

	fechaBaja: Date;

	cantidadMaximaAnual: number;
	
	cantidadMaximaDiaria: number;
	
	cantidadMaximaMensual: number;
	
	codigo: string;
	
	denominacion: string;
	
	generaRequerimiento: string;
	
	justificaRequerimiento: string;
	
	limiteRangoDias: number;
	
	modalidadLicencia: string;
	
	observaciones: string;
	
	permiteSolapamiento: string;
	
	tipoCalculo: string;

	//Relation

	tipoRequerimiento: TipoRequerimiento;

	constructor(codigo: string, denominacion: string, id?: number){
        super();
        this.id = id;
        this.codigo =  codigo;
        this.denominacion = denominacion;
    }

}