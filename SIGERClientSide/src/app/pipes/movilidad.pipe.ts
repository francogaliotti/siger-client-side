import { Pipe, PipeTransform } from '@angular/core';
import { Movilidad } from '../models/movilidad';

@Pipe({
  name: 'movilidadPipe'
})
export class MovilidadPipe implements PipeTransform {

  transform(movilidades: Movilidad[], page: number=0, search: string =''): Movilidad[] {

    if(search.length === 0)
      return movilidades.slice(page, page +10);

    const filtered_Movilidades = movilidades.filter(resp => resp.patente.includes( search ));

    return filtered_Movilidades.slice(page, page +10);
  }

}
