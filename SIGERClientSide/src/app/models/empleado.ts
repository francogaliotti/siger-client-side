import { BaseEntity } from "./base-entity";
import { ComputoDiasLicencia } from "./computo-dias-licencia";
import { Domicilio } from "./domicilio";
import { HistorialSectorEmpleado } from "./historial-sector-empleado";
import { RegimenHorario } from "./regimen-horario";
import { Planilla } from "./planilla";
import { RemanenteDiasLicencia } from "./remanente-dias-licencia";
import { Remuneracion } from "./remuneracion";
import { Usuario } from "./usuario";
import { Nacionalidad } from "./nacionalidad";
import { DocumentoIdentidad } from "./documentoidentidad";

export class Empleado extends BaseEntity{
	
	nombre: string;
	
	apellido: string;
	
	correoPersonal: string;
	
	estadoCivil: number;
	
	legajo: number;
	
	fechaLimiteReemplazo: Date;
	
	fechaNacimiento: Date;
	
	diasLicenciaAnualFija: number;
	
	fechaIngreso: Date;
	
	rompeReglaComisionDia: boolean;
	
	rompeReglaFichadaReloj: boolean;
	
	puedeAprobarRequerimiento: boolean;
	
	rompeReglaFichadaSupervisor: boolean;
	
	esEncargado: boolean;
	
	nroTelefonoFijo: string;
	
	nroTelefonoCelular: string;

	remuneraciones: Array<Remuneracion>;

	regimenesHorario: Array<RegimenHorario>;

	usuario: Usuario;

	domicilio: Domicilio;

	historialSectorEmpleado: Array<HistorialSectorEmpleado>;

	planillas: Array<Planilla>;

	computoDiasLicencia: Array<ComputoDiasLicencia>;

	remanenteDiasLicencia: Array<RemanenteDiasLicencia>;

	nacionalidad: Nacionalidad;

	documentoIdentidad: Array<DocumentoIdentidad>

}