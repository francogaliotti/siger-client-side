import { BaseEntity } from "./base-entity";
import { TipoRequerimiento } from "./tipo-requerimiento";

export class TipoBoleta extends BaseEntity{

    codigo: string;

	denominacion: string;
	
	tieneMovilidad: boolean;
	
	tineZonaInhospita: boolean;
	
	tieneViatico: boolean;
	
	permiteNoFichadaRetorno: boolean;
	
	permiteNoFichadaSalida: boolean;

	//Relation

	tipoRequerimiento: TipoRequerimiento;
	
}