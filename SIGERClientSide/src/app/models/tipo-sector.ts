import { BaseEntity } from "./base-entity";

export class TipoSector extends BaseEntity{

    codTipoSector: string;
	
	nombreTipoSector: string;
    
    constructor(codTipoSector: string, nombreTipoSector: string, id?: number){
        super();
        this.id = id;
        this.codTipoSector = codTipoSector;
        this.nombreTipoSector = nombreTipoSector;
    }
}