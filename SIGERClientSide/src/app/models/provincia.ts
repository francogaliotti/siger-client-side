import { BaseEntity } from "./base-entity";
import { Departamento } from "./departamento";

export class Provincia extends BaseEntity{

    codigo: string;
	
	denominacion: string;
    constructor(codigo: string,denominacion: string, id?:number){
        super();
        this.codigo=codigo;
        
        this.denominacion=denominacion;
        this.id=id;
    }

}