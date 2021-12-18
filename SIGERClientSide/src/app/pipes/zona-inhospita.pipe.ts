import { Pipe, PipeTransform } from '@angular/core';
import { ZonaInhospita } from 'src/app/models/zona-inhospita';

@Pipe({
  name: 'zonaInhospitaPipe'
})
export class ZonaInhospitaPipe implements PipeTransform {

  transform(zonas_inhospitas: ZonaInhospita[], page: number=0, search: string =''): ZonaInhospita[] {
    
    if(search.length === 0)
      return zonas_inhospitas.slice(page, page +10);

  const filtered_Estado_Boletas = zonas_inhospitas.filter(resp => resp.denominacionZona.includes( search ));

  return filtered_Estado_Boletas.slice(page, page +10);
  }

}