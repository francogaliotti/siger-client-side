import { BaseEntity } from "./base-entity";

export class Remuneracion extends BaseEntity{

	denominacion: string;

    valorHora: number;

	valorViaticoDia: number;
	
	importeHorasAdicionales: number;
	
	importeZonaDesarraigo: number;

	constructor(denominacion: string, valorHora: number,valorViaticoDia: number,importeHorasAdicionales: number,importeZonaDesarraigo: number){
		super();
		this.denominacion = denominacion;
		this.valorHora = valorHora;
		this.valorViaticoDia = valorViaticoDia;
		this.importeHorasAdicionales = importeHorasAdicionales;
		this.importeZonaDesarraigo = importeZonaDesarraigo;
	}

}