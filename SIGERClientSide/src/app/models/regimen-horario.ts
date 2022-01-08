import { BaseEntity } from "./base-entity";
import { TipoRegimenHorario } from "./tipo-regimen-horario";

export class RegimenHorario extends BaseEntity {

    isActive: boolean;

    fechaInicioVigenciaRegimenHorario: Date;

    fechaFinVigenciaRegimenHorario: Date;

    horaMinutoInicioJornadaLaboral: string;

    horaMinutoFinJornadaLaboral: string;

    //Relation

    tipoRegimenHorario: TipoRegimenHorario;

    constructor(horaMinutoInicioJornadaLaboral: string, horaMinutoFinJornadaLaboral: string, tipoRegimenHorario: TipoRegimenHorario, 
        id?: number) {
        super();
        this.id = id;
        this.horaMinutoInicioJornadaLaboral = horaMinutoInicioJornadaLaboral;
        this.horaMinutoFinJornadaLaboral = horaMinutoFinJornadaLaboral;
        this.tipoRegimenHorario = tipoRegimenHorario;
    }

}