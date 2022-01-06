import { BaseEntity } from "./base-entity";

export class TipoRegimenHorario extends BaseEntity{

	codigoTipoRegimenHorario: string;

	denominacionTipoRegimenHorario: string;

	constructor(codigoTipoRegimenHorario: string, denominacionTipoRegimenHorario: string, id?: number){
        super();
        this.id = id;
        this.codigoTipoRegimenHorario = codigoTipoRegimenHorario;
        this.denominacionTipoRegimenHorario = denominacionTipoRegimenHorario;
    }
	
}