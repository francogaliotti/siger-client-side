import { BaseEntity } from "./base-entity";
import { TipoMovilidad } from "./tipo-movilidad";

export class Movilidad extends BaseEntity{

    fechaAlta: Date;
	
	fechaBaja: Date;
	
	codigo: string;

	patente: string;

	//Relation

	tipoMovilidad: TipoMovilidad;
	
}