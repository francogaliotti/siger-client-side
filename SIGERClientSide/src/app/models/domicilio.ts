import { BaseEntity } from "./base-entity";
import { Localidad } from "./localidad";

export class Domicilio extends BaseEntity{

    calle: string;
	
	nroCalle: number;
	
	nroDepartamento: string;
	
	nroPiso: string;

	barrio: string;
	manzana: string;
	casa: string;

	//Relation

	localidad: Localidad;

}