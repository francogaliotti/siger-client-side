import { BaseEntity } from "./base-entity";

export class TipoMovilidad extends BaseEntity{

    fechaAlta: Date;
	
	fechaBaja: Date;
	
	codigo: string;
	
	denominacion: string;

	getDenominacion():string{
		return this.denominacion;
	}

	constructor(codigo: string, denominacion:string, id?:number){
		super();
		this.codigo=codigo;
		this.denominacion=denominacion;
		this.id=id;
	}
	
}