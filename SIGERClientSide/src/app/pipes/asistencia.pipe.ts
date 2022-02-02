import { Pipe, PipeTransform } from '@angular/core';
import { Asistencia } from '../models/asistencia';

@Pipe({
  name: 'asistenciaPipe'
})
export class AsistenciaPipe implements PipeTransform {

  transform(asistencias: Asistencia[], page: number = 0, start: Date, end: Date, search: string = ''): Asistencia[] {

    if (search.length === 0)
      return asistencias.slice(page, page + 10);

    /*if (start == null && end == null)
      return asistencias.slice(page, page + 10);*/

    const filtered_Asistencias = asistencias.filter(resp => resp.tipoMovimiento.includes(search));

    return filtered_Asistencias.slice(page, page + 10);

  }

}
