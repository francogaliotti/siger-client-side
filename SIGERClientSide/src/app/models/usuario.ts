import { BaseEntity } from "./base-entity";
import { Rol } from "./rol";

export class Usuario extends BaseEntity{

    nombre: string;
    
    username: string;
    
    password: string;
    
    correoInstitucional: string;

    image: string;

    //rolNecesario: string;
    
    esPrimerInicio: boolean;
    
    enabled: boolean;

    requiereAutorizacion: boolean;

    recordarme: boolean;

    //Relation

    roles: Array<Rol>;

    constructor(username: string, password: string, correoInstitucional: string, rolNecesario: string, id?: number){
        super();
        this.id = id;
        this.username = username;
        this.password = password;
        this.correoInstitucional = correoInstitucional;
        //this.rolNecesario = rolNecesario;
    }

}