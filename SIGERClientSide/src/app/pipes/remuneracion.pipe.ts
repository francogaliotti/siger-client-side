import { Pipe, PipeTransform } from '@angular/core';
import { Remuneracion } from '../models/remuneracion';

@Pipe({
  name: 'remuneracionPipe'
})
export class RemuneracionPipe implements PipeTransform {

  transform(remuneracion: Remuneracion[],page: number=0, search: string =''): Remuneracion[] {
    
    if(search.length === 0)
  return remuneracion.slice(page, page +10);

  const filtered_Remuneracion = remuneracion.filter(resp => resp.denominacion.includes( search ));

  return filtered_Remuneracion.slice(page, page +10);
  }

}