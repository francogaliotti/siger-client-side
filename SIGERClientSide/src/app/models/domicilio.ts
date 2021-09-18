import { BaseEntity } from "./base-entity";
import { Localidad } from "./localidad";

export class Domicilio extends BaseEntity{

    calle: string;
	
	nroCalle: number;
	
	nroDepartamento: number;
	
	nroPiso: number;

	//Relation

	localidad: Localidad;

}