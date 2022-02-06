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
	barrio: string;
	manzana: string;
	casa: string;
	localidad: Localidad;
	provincia: Provincia;

	//Relation
	departamento: Departamento;


}