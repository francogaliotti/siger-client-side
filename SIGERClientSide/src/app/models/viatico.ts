import { BaseEntity } from "./base-entity";

export class Viatico extends BaseEntity{

    codViatico: string;

	denominacionViatico: string;
	
	importe: number;

	constructor(codViatico: string, denominacionViatico: string, importe: number){
		super();
		this.codViatico = codViatico;
		this.denominacionViatico = denominacionViatico;
		this.importe = importe;
	}
	
}