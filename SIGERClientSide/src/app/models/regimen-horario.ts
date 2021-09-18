import { BaseEntity } from "./base-entity";
import { TipoRegimenHorario } from "./tipo-regimen-horario";

export class RegimenHorario extends BaseEntity{

    fechaInicioVigenciaRegimenHorario: Date;

	fechaFinVigenciaRegimenHorario: Date;

	horaMinutoInicioJornadaLaboral: Date;
	
	horaMinutoFinJornadaLaboral: Date;

    //Relation

    tipoRegimenHorario: TipoRegimenHorario;

}