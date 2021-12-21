import { BaseEntity } from "../models/base-entity";

export class TipoBoletaDTO extends BaseEntity{

     codigo: string;
     
     tipoBoletaDenominacion: string;
     
     tieneMovilidad: boolean;
     
     tieneZonaInhospita: boolean;
     
     tieneViatico: boolean;
     
     permiteNoFichadaRetorno: boolean;
     
     permiteNoFichadaSalida: boolean;

     constructor(
		codigo: string,
		tipoBoletaDenominacion: string,
		tieneMovilidad: boolean,
		tieneZonaInhospita: boolean,
		tieneViatico: boolean,
		permiteNoFichadaRetorno: boolean,
		permiteNoFichadaSalida: boolean,
		
	){
		super();
		this.codigo = codigo;
		this.tipoBoletaDenominacion = tipoBoletaDenominacion;
		this.tieneMovilidad = tieneMovilidad;
		this.tieneZonaInhospita = tieneZonaInhospita;
		this.tieneViatico = tieneViatico;
		this.permiteNoFichadaRetorno = permiteNoFichadaRetorno;
		this.permiteNoFichadaSalida = permiteNoFichadaSalida;
	}
}
