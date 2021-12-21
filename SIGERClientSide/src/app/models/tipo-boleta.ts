import { BaseEntity } from "./base-entity";
import { TipoRequerimiento } from "./tipo-requerimiento";

export class TipoBoleta extends BaseEntity{

    codigo: string;

	tipoBoletaDenominacion: string;
	
	tieneMovilidad: boolean;
	
	tieneZonaInhospita: boolean;
	
	tieneViatico: boolean;
	
	permiteNoFichadaRetorno: boolean;
	
	permiteNoFichadaSalida: boolean;

	//Relation

	tipoRequerimiento: TipoRequerimiento;

	constructor(
		codigo: string,
		tipoBoletaDenominacion: string,
		tieneMovilidad: boolean,
		tieneZonaInhospita: boolean,
		tieneViatico: boolean,
		permiteNoFichadaRetorno: boolean,
		permiteNoFichadaSalida: boolean,
		//tipoRequerimiento: TipoRequerimiento
	){
		super();
		this.codigo = codigo;
		this.tipoBoletaDenominacion = tipoBoletaDenominacion;
		this.tieneMovilidad = tieneMovilidad;
		this.tieneZonaInhospita = tieneZonaInhospita;
		this.tieneViatico = tieneViatico;
		this.permiteNoFichadaRetorno = permiteNoFichadaRetorno;
		this.permiteNoFichadaSalida = permiteNoFichadaSalida;
		//this.tipoRequerimiento = tipoRequerimiento;
	}
	
}