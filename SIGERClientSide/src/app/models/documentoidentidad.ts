import { BaseEntity } from "./base-entity";
import { TipoDocumento } from "./tipodocumento";

export class DocumentoIdentidad extends BaseEntity {
    nroIdentidad: string;

    tipoDocumento: TipoDocumento
}
