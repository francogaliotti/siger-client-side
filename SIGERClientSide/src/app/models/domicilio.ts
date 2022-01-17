import { BaseEntity } from "./base-entity";
import { Localidad } from "./localidad";
import { Provincia } from "./provincia";

export class Domicilio extends BaseEntity{

    calle: string;
	nroCalle: number;	
	nroDepartamento: string;	
	nroPiso: string;
	barrio: string;
	manzana: string;
	casa: string;
	localidad: Localidad;
	provincia: Provincia;

}