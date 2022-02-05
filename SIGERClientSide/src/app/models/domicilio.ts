import { BaseEntity } from "./base-entity";
import { Departamento } from "./departamento";
import { Localidad } from "./localidad";
import { Municipio } from "./municipio";
import { Provincia } from "./provincia";

export class Domicilio extends BaseEntity{

    calle: string;
	
	nroCalle: number;
	
	nroDepartamento: string;
	
	nroPiso: string;

	//Relation

	localidad: Localidad;
	provincia: Provincia;
	departamento: Departamento;
	constructor(){
		super();
	}

}