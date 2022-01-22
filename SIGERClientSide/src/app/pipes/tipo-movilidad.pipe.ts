import { Pipe, PipeTransform } from '@angular/core';
import { TipoMovilidad } from '../models/tipo-movilidad';

@Pipe({
  name: 'tipoMovilidadPipe'
})
export class TipoMovilidadPipe implements PipeTransform {

  transform(tipos: TipoMovilidad[], page: number=0, search: string =''): TipoMovilidad[] {

    if(search.length === 0)
      return tipos.slice(page, page +10);

    const filtered_Tipos = tipos.filter(resp => resp.denominacion.includes( search ));

    return filtered_Tipos.slice(page, page +10);
  }

}
