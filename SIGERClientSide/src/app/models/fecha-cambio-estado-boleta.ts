import { BaseEntity } from "./base-entity";
import { Empleado } from "./empleado";
import { EstadoBoleta } from "./estado-boleta";

export class FechaCambioEstadoBoleta extends BaseEntity{

    fechaCambioEstadoBoleta: Date;

    fechaFinEstadoBoleta: Date;

    //Relations

    estadoBoleta: EstadoBoleta;

    empleadoEvaluadorBoleta: Empleado;
    
}