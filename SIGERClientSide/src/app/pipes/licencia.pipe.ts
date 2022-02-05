import { Pipe, PipeTransform } from '@angular/core';
import { Licencia } from '../models/licencia';

@Pipe({
  name: 'licenciaPipe'
})
export class LicenciaPipe implements PipeTransform {

  transform(licencias: Licencia[], page: number=0, search: string =''): Licencia[] {

    if(search.length === 0)
      return licencias.slice(page, page +10);

    const filtered_Licencias = licencias.filter(resp => resp.tipoLicencia.denominacion.includes( search ));

    return filtered_Licencias.slice(page, page +10);
  }

}
