import { BaseEntity } from "./base-entity";
import { Departamento } from "./departamento";

export class Localidad extends BaseEntity{

    denominacion: string;

    //Relation

    departamento: Departamento;

}