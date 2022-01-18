import { BaseEntity } from "./base-entity";
import { Comentario } from "./comentario";
import { DocumentoAdjuntoBoleta } from "./documento-adjunto-boleta";
import { Empleado } from "./empleado";
import { EstadoBoleta } from "./estado-boleta";
import { FechaCambioEstadoBoleta } from "./fecha-cambio-estado-boleta";
import { Movilidad } from "./movilidad";
import { TipoBoleta } from "./tipo-boleta";
import { Viatico } from "./viatico";
import { ZonaInhospita } from "./zona-inhospita";

export class Boleta extends BaseEntity{

    fechaAlta: Date;
	
	fechaBaja: Date;
	
	numero: string;
	
	fechaHoraLlegada: Date;
	
	fechaHoraSalida: Date;
	
	fechaHoraPosibleLlegada: Date;
	
	fechaHoraPosibleSalida: Date;
	
	periodo: number;
	
	fechaCierre: Date;
	
	fechaControl: Date;
	
	observacionesBoleta: string;
	
	fechaSincronizacion: Date;
	
	sinFichadaRetorno: boolean;
	
	sinFichadaSalida: boolean;

	//Relations

	zonaInhospita: ZonaInhospita;

	viatico: Viatico;

	empleado: Empleado;

	fechasCambioEstadoBoleta: Array<FechaCambioEstadoBoleta>;

	documentosAdjuntosBoleta: Array<DocumentoAdjuntoBoleta>

	movilidades: Array<Movilidad>;

	tipoBoleta: TipoBoleta;

	comentarios: Array<Comentario>;

	estadoActual: string;


}