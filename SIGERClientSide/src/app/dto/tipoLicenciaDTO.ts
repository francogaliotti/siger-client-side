import { BaseEntity } from "../models/base-entity";

export class TipoLicenciaDTO extends BaseEntity{
    codigo: string;
	
	denominacion: string;

	justificaPresentismo: boolean;
	
	generaRequerimiento: string;
	
	justificaRequerimiento: string;
	
	limiteRangoDias: number;
	
	modalidadLicencia: string;
	
	observaciones: string;
	
	permiteSolapamiento: string;
	
	tipoCalculo: string;

    tipoRequerimientoCantNiveles: number;

    tipoRequerimientoDenominacion: string;

    constructor(/*codigo: string,
        denominacion: string,
        justificaPresentismo: boolean,
        tipoRequerimientoCantNiveles: number,
        tipoRequerimientoDenominacion: string, 
        id?: number*/){
            
        super();
        /*this.denominacion=denominacion;
        this.codigo=codigo;
        this.justificaPresentismo=justificaPresentismo;
        this.tipoRequerimientoCantNiveles=tipoRequerimientoCantNiveles;
        this.tipoRequerimientoDenominacion=tipoRequerimientoDenominacion;*/
    }
}