import { BaseEntity } from "./base-entity";
import { Empleado } from "./empleado";
import { Sector } from "./sector";

export class TipoRequerimiento extends BaseEntity{

    tipoRequerimientoDenominacion: string;

	cantNiveles: number;

    //Relations

    aprueban: Array<Sector>;

    aprobadores: Array<Empleado>;

    constructor (tipoRequerimientoDenominacion: string, cantNiveles: number){
        super();
        this.tipoRequerimientoDenominacion = tipoRequerimientoDenominacion;
        this.cantNiveles = cantNiveles;
    }
    
}