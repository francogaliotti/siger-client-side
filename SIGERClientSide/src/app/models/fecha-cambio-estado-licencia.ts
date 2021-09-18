import { BaseEntity } from "./base-entity";
import { Empleado } from "./empleado";
import { EstadoLicencia } from "./estado-licencia";

export class FechaCambioEstadoLicencia extends BaseEntity{

    fechaCambioEstadoLicencia: Date;

    //Relations

    estadoLicencia: EstadoLicencia;

    empleadoEvaluadorBoleta: Empleado;
    
}