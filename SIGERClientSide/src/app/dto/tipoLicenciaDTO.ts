import { BaseEntity } from "../models/base-entity";
import { Empleado } from "../models/empleado";
import { Sector } from "../models/sector";

export class TipoLicenciaDTO extends BaseEntity{

    codigo: string;
	
	denominacion: string;

    cantidadMaximaAnual: number;

	justificaPresentismo: boolean;

	limiteRangoDias: number;

    goceSueldo: boolean;
	
	observaciones: string;

    tipoRequerimientoCantNiveles: number;

    tipoRequerimientoDenominacion: string;

    tipoRequerimientoAprueban: Array<Sector>;

    tipoRequerimientoAprobadores: Array<Empleado>;

    constructor(
        codigo: string,
        denominacion: string,
        justificaPresentismo: boolean,
	    limiteRangoDias: number,
        goceSueldo: boolean,
	    observaciones: string,  
        id?: number){
            
        super();

        this.goceSueldo=goceSueldo;
        this.denominacion=denominacion;
        this.codigo=codigo;
        this.justificaPresentismo=justificaPresentismo;
        this.limiteRangoDias=limiteRangoDias;
        this.observaciones=observaciones;

    }
}