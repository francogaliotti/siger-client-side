import { BaseEntity } from "../models/base-entity";
import { Empleado } from "../models/empleado";
import { Sector } from "../models/sector";

export class TipoBoletaDTO extends BaseEntity{

     codigo: string;
     
     tipoBoletaDenominacion: string;
     
     tieneMovilidad: boolean;
     
     tieneZonaInhospita: boolean;
     
     tieneViatico: boolean;
     
     permiteNoFichadaRetorno: boolean;
     
     permiteNoFichadaSalida: boolean;

	 tipoRequerimientoCantNiveles: number;

    tipoRequerimientoDenominacion: string;

    tipoRequerimientoAprueban: Array<Sector>;

    tipoRequerimientoAprobadores: Array<Empleado>;

     constructor(
		codigo: string,
		tipoBoletaDenominacion: string,
		tieneMovilidad: boolean,
		tieneZonaInhospita: boolean,
		tieneViatico: boolean,
		permiteNoFichadaRetorno: boolean,
		permiteNoFichadaSalida: boolean,
		tipoRequerimientoCantNiveles: number,
        tipoRequerimientoDenominacion: string, 
        tipoRequerimientoAprueban: Array<Sector>,
        tipoRequerimientoAprobadores: Array<Empleado>,
		id?: number
		
	){
		super();
		this.codigo = codigo;
		this.tipoBoletaDenominacion = tipoBoletaDenominacion;
		this.tieneMovilidad = tieneMovilidad;
		this.tieneZonaInhospita = tieneZonaInhospita;
		this.tieneViatico = tieneViatico;
		this.permiteNoFichadaRetorno = permiteNoFichadaRetorno;
		this.permiteNoFichadaSalida = permiteNoFichadaSalida;
		this.tipoRequerimientoCantNiveles=tipoRequerimientoCantNiveles;
        this.tipoRequerimientoDenominacion=tipoRequerimientoDenominacion;
        this.tipoRequerimientoAprobadores=tipoRequerimientoAprobadores;
        this.tipoRequerimientoAprueban=tipoRequerimientoAprueban;
	}
}
