import { Pipe, PipeTransform } from '@angular/core';
import { EstadoLicencia } from 'src/app/models/estado-licencia';

@Pipe({
  name: 'estadoLicenciaPipe'
})
export class EstadoLicenciaPipe implements PipeTransform {

  transform(estado_licencias: EstadoLicencia[], page: number=0, search: string =''): EstadoLicencia[] {
    
    if(search.length === 0)
      return estado_licencias.slice(page, page +10);

  const filtered_Estado_Licencias = estado_licencias.filter(resp => resp.nombreEstadoLicencia.includes( search ));

  return filtered_Estado_Licencias.slice(page, page +10);

  }

}
