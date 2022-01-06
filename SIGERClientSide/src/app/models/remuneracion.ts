import { BaseEntity } from "./base-entity";

export class Remuneracion extends BaseEntity{

    valorHora: number;

	valorViaticoDia: number;
	
	importeHorasAdicionales: number;
	
	importeZonaDesarraigo: number;

	constructor(valorHora: number,valorViaticoDia: number,importeHorasAdicionales: number,importeZonaDesarraigo: number){
		super();
		this.valorHora = valorHora;
		this.valorViaticoDia = valorViaticoDia;
		this.importeHorasAdicionales = importeHorasAdicionales;
		this.importeZonaDesarraigo = importeZonaDesarraigo;
	}

}