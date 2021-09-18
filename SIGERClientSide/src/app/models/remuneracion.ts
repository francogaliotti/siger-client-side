import { BaseEntity } from "./base-entity";

export class Remuneracion extends BaseEntity{

    valorHora: number;

	valorViaticoDia: number;
	
	importeHorasAdicionales: number;
	
	importeZonaDesarraigo: number;

}