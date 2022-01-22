import { Pipe, PipeTransform } from '@angular/core';
import { Boleta } from '../models/boleta';

@Pipe({
  name: 'boletaPipe'
})
export class BoletaPipe implements PipeTransform {

    transform(boletas: Boleta[], page: number=0, search: string =''): Boleta[] {

      if(search.length === 0)
        return boletas.slice(page, page +10);
  
      const filtered_Boletas = boletas.filter(resp => resp.tipoBoleta.tipoBoletaDenominacion.includes( search ));
  
      return filtered_Boletas.slice(page, page +10);
    }
  }


