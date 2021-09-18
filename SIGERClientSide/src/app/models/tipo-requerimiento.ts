import { BaseEntity } from "./base-entity";
import { Empleado } from "./empleado";
import { Sector } from "./sector";

export class TipoRequerimiento extends BaseEntity{

    denominacion: string;

	cantNiveles: number;

    //Relations

    aprueban: Array<Sector>;

    aprobadores: Array<Empleado>;
    
}