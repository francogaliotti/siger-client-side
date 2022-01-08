import { BaseEntity } from "./base-entity";
import { Domicilio } from "./domicilio";
import { TipoSector } from "./tipo-sector";

export class Sector extends BaseEntity{

    codigo: string;

	denominacion: string;
	
	fechaBaja: Date;
	
	validaFueraDeHorario: boolean;
	
	detenerCargaBoletas: string;
	
	permiteTrabajarHorasExtras: boolean;
	
	permiteTrabajarFinDeSemana: boolean;
	
	maximoSerenoDiurno: number;
	
	maximoSerenoNocturno: number;

	//Relations

	sectorSuperior: Sector;

	tipoSector: TipoSector;

	domicilio: Domicilio;

	constructor(codigo: string, denominacion: string, validaFueraDeHorario: boolean,
		permiteTrabajarHorasExtras: boolean, permiteTrabajarFinDeSemana: boolean,
		maximoSerenoDiurno: number, maximoSerenoNocturno: number, tipoSector: TipoSector,
		sectorSuperior: Sector, id?:number){
		super();
		this.id=id;
		this.codigo=codigo;
		this.denominacion=denominacion;
		this.validaFueraDeHorario=validaFueraDeHorario;
		this.permiteTrabajarFinDeSemana=permiteTrabajarFinDeSemana;
		this.permiteTrabajarHorasExtras=permiteTrabajarHorasExtras;
		this.maximoSerenoDiurno=maximoSerenoDiurno;
		this.maximoSerenoNocturno=maximoSerenoNocturno;
		this.sectorSuperior=sectorSuperior;
		this.tipoSector=tipoSector;
		
		
	}
	
}