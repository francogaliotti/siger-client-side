import { Pipe, PipeTransform } from '@angular/core';
import { Asistencia } from '../models/asistencia';

@Pipe({
  name: 'misAsistenciasPipe'
})
export class MisAsistenciasPipe implements PipeTransform {

  transform(asistencias: Asistencia[], page: number = 0, search: string = ''): Asistencia[] {

    if (search.length === 0)
      return asistencias.slice(page, page + 10);

    const filtered_Asistencias = asistencias.filter(resp => resp.tipoMovimiento.includes(search));

    return filtered_Asistencias.slice(page, page + 10);

  }

}
