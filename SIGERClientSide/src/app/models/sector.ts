import { BaseEntity } from "./base-entity";
import { Domicilio } from "./domicilio";
import { TipoSector } from "./tipo-sector";

export class Sector extends BaseEntity{

    codigo: string;

	denominacion: string;
	
	fechaBaja: Date;
	
	validaFueraDeHorario: string;
	
	detenerCargaBoletas: string;
	
	permiteTrabajarHorasExtras: boolean;
	
	permiteTrabajarFinDeSemana: boolean;
	
	maximoSerenoDiurno: number;
	
	maximoSerenoNocturno: number;

	//Relations

	sectorSuperior: Sector;

	tipoSector: TipoSector;

	domicilio: Domicilio;

	constructor(){
		super();
	}
	
}