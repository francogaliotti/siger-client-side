import { BaseEntity } from "./base-entity";
import { TipoMovilidad } from "./tipo-movilidad";

export class Movilidad extends BaseEntity{

    fechaAlta: Date;
	
	fechaBaja: Date;
	
	codigo: string;

	patente: string;

	//Relation

	tipoMovilidad: TipoMovilidad;

	constructor(codigo:string,patente:string,tipoMovilidad:TipoMovilidad,id?:number){
		super();
		this.codigo=codigo;
		this.patente=patente;
		this.tipoMovilidad=tipoMovilidad;
		this.id=id;
	}
	
}