import { BaseEntity } from "./base-entity";

export class TipoMovilidad extends BaseEntity{

    fechaAlta: Date;
	
	fechaBaja: Date;
	
	codigo: string;
	
	denominacion: string;
	
}