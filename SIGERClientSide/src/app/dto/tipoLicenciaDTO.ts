import { BaseEntity } from "../models/base-entity";
import { Empleado } from "../models/empleado";
import { Sector } from "../models/sector";

export class TipoLicenciaDTO extends BaseEntity{
    cantidadMaximaAnual: number;

    cantidadMaximaMensual:number;
    
    cantidadMaximaDiaria: number;
   
    codigo: string;
	
	denominacion: string;

	justificaPresentismo: boolean;

	limiteRangoDias: number;

    goceSueldo: boolean;
	
	observaciones: string;

    tipoRequerimientoCantNiveles: number;

    tipoRequerimientoDenominacion: string;

    tipoRequerimientoAprueban: Array<Sector>;

    tipoRequerimientoAprobadores: Array<Empleado>;

    constructor(cantidadMaximaAnual: number,
        cantidadMaximaMensual: number,
        cantidadMaximaDiaria: number,
        codigo: string,
        denominacion: string,
        justificaPresentismo: boolean,
	    limiteRangoDias: number,
        goceSueldo: boolean,
	    observaciones: string,  
        tipoRequerimientoCantNiveles: number,
        tipoRequerimientoDenominacion: string, 
        tipoRequerimientoAprueban: Array<Sector>,
        tipoRequerimientoAprobadores: Array<Empleado>,
        id?: number){
            
        super();
        this.cantidadMaximaAnual=cantidadMaximaAnual;
        this.cantidadMaximaDiaria=cantidadMaximaDiaria;
        this.cantidadMaximaMensual=cantidadMaximaMensual;
        this.goceSueldo=goceSueldo;
        this.denominacion=denominacion;
        this.codigo=codigo;
        this.justificaPresentismo=justificaPresentismo;
        this.limiteRangoDias=limiteRangoDias;
        this.observaciones=observaciones;
        this.tipoRequerimientoCantNiveles=tipoRequerimientoCantNiveles;
        this.tipoRequerimientoDenominacion=tipoRequerimientoDenominacion;
        this.tipoRequerimientoAprobadores=tipoRequerimientoAprobadores;
        this.tipoRequerimientoAprueban=tipoRequerimientoAprueban;
    }
}