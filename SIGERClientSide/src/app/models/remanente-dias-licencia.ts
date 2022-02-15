import { BaseEntity } from "./base-entity";
import { TipoLicencia } from "./tipo-licencia";

export class RemanenteDiasLicencia extends BaseEntity{

    anioRemanente: number;
	
	diasSobrantes: number;

    tipoLicencia: TipoLicencia;
    
}