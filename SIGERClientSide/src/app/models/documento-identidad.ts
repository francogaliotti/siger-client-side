import { BaseEntity } from "./base-entity";
import { TipoDocumento } from "./tipo-documento";

export class DocumentoIdentidad extends BaseEntity{

    nroIdentidad: string;

    tipoDocumento: TipoDocumento;

}
