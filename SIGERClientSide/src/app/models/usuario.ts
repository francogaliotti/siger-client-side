import { BaseEntity } from "./base-entity";
import { Rol } from "./rol";

export class Usuario extends BaseEntity{
    
    username: string;
    
    password: string;
    
    correoInstitucional: string;

    rolNecesario: string;
    
    esPrimerInicio: boolean;
    
    enabled: boolean;

    requiereAutorizacion: boolean;

    recordarme: boolean;

    //Relation

    roles: Array<Rol>;

}