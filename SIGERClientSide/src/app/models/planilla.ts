import { Asistencia } from "./asistencia";
import { BaseEntity } from "./base-entity";
import { Boleta } from "./boleta";
import { Licencia } from "./licencia";

export class Planilla extends BaseEntity{

    fechaProcesamiento: Date;
	
	fechaDesde: Date;
	
	fechaHasta: Date;
	
	totalGabinete: number;
	
	totalGabineteParcial: number;
	
	totalGabinetesCompletos: number;
	
	totalGabinetesCompletosEstadia: number;
	
	totalGabineteDesarraigo: number;
	
	totalGabineteSereno: number;

	//Relations

	boletas: Array<Boleta>;

	asistencias: Array<Asistencia>;

	licencias: Array<Licencia>;
	
}