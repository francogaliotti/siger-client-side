import { BaseEntity } from "./base-entity";
import { Empleado } from "./empleado";

export class Asistencia extends BaseEntity {

    fechaAlta: Date;

    fechaBaja: Date;

    fechaHora: string;

    fechaCierre: Date;

    fechaModificacion: Date;

    fechaSincronizacion: Date;

    reloj: number;

    supervisor: boolean;

    tipoMovimiento: string;

    excesoHorario: string;

    horaAsignado: number;

    viaticoGabinete: boolean;

    //Relation

    empleado: Empleado

    constructor(fechaHora: string, tipoMovimiento: string, empleado: Empleado, id?: number){
        super();
        this.id = id;
        this.fechaHora = fechaHora;
        this.tipoMovimiento = tipoMovimiento;
        this.empleado = empleado;
    }

}