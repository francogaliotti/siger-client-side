import { BaseEntity } from "./base-entity";
import { Comentario } from "./comentario";
import { DocumentoAdjuntoLicencia } from "./documento-adjunto-licencia";
import { Empleado } from "./empleado";
import { FechaCambioEstadoLicencia } from "./fecha-cambio-estado-licencia";
import { TipoLicencia } from "./tipo-licencia";

export class Licencia extends BaseEntity{

    fechaAlta: Date;
	
	fechaBaja: Date;
	
	fechaInicioLicencia: Date;
	
	fechaFinLicencia: Date;
	
	fechaFrancoCompensatorio: Date;
	
	fechaCierre: Date;
	
	fechaControl: Date;
	
	fechaSincronizacion: Date;
	
	observacionesLicencia: string;

	//Relations

	comentarios: Array<Comentario>;

	documentosAdjuntosLicencia: Array<DocumentoAdjuntoLicencia>;

	tipoLicencia: TipoLicencia;

	fechasCambioEstadoLicencia: Array<FechaCambioEstadoLicencia>;

	empleado: Empleado;

	estadoActual: string;

	constructor(){
		super();
	}

}