import { BaseEntity } from "./base-entity";
import { Sector } from "./sector";

export class HistorialSectorEmpleado extends BaseEntity{
    
    fechaIngreso: Date;
	
	fechaSalida: Date;
	
	vigente: boolean;

	//Relation

	sector: Sector;

}