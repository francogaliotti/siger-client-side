import { BaseEntity } from "./base-entity";
import { Provincia } from "./provincia";

export class Departamento extends BaseEntity{

	denominacion: string;

	//Relation

	provincia: Provincia;
	
}